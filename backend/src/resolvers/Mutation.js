const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../mail");
const { hasPermission } = require("../utils");

const maxAge = 1000 * 60 * 60 * 24 * 365;

const mutations = {
  async createCharity(parent, args, ctx, info) {
    // check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to add new charities.");
    }

    const charity = await ctx.db.mutation.createCharity(
      {
        data: {
          // creates relationship between charity and user
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return charity;
  },

  async updateCharity(parent, args, ctx, info) {
    // get copy of updates
    const updates = { ...args };
    // remove ID from updates (so it can be referenced here)
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateCharity(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteCharity(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the item
    const charity = await ctx.db.query.charity({ where }, `{id name user{id}}`);
    // check if they have permissions
    const ownsCharity = charity.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "CHARITYDELETE"].includes(permission)
    );
    if (!ownsCharity && !hasPermissions) {
      throw new Error("You don't have permission to do that.");
    }
    // delete it
    return ctx.db.mutation.deleteCharity({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash the password
    const password = await bcrypt.hash(args.password, 10);
    // create user in DB
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    // create jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set jwt as cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge
    });
    // return user to browser
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // check if user exists w/ email
    const user = await ctx.db.query.user({
      where: { email }
    });
    if (!user) {
      throw new Error("No user found with that email.");
    }
    // check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password.");
    }
    // generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set cookie with token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge
    });
    // return the user
    return user;
  },

  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Signing Out" };
  },

  async requestReset(parent, args, ctx, info) {
    // check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error("No user found with that email.");
    }
    // set reset token and expiry on user
    const resetToken = (await promisify(randomBytes)(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry time
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    // email reset token
    const mailRes = await transport.sendMail({
      from: "glover.ethan@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: makeANiceEmail(`
                    Your password reset token is here!\n
                    <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
                        Click Here to Reset
                    </a>
                `)
    });
    // return message
    return { message: "Success!" };
  },

  async resetPassword(parent, args, ctx, info) {
    // check if passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Passwords don't match");
    }
    // check validity of reset token
    // check if token is expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error("This token is either invalid or expired.");
    }
    // hash new password
    const password = await bcrypt.hash(args.password, 10);
    // save new password to user & remove old reset token
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // generate jwt
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // set jwt cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge
    });
    // return new user
    return updatedUser;
  },

  async updatePermissions(parent, args, ctx, info) {
    // check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do this.");
    }
    // query current user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );
    // check if they have correct permissions
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
    // update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  },

  async addToFavorites(parent, args, ctx, info) {
    // Make sure they're signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to do that.");
    }
    // Query the users current favorites
    const [existingFavorite] = await ctx.db.query.favorites({
      where: {
        user: { id: userId },
        charity: { id: args.id }
      }
    });
    // Add to favorites if not already in list
    if (!existingFavorite) {
      return ctx.db.mutation.createFavorite(
        {
          data: {
            user: {
              connect: { id: userId }
            },
            charity: {
              connect: { id: args.id }
            }
          }
        },
        info
      );
    }
  },

  async removeFromFavorites(parent, args, ctx, info) {
    // find favorite item
    const favorite = await ctx.db.query.favorite(
      {
        where: {
          id: args.id
        }
      },
      `{id, user { id}}`
    );
    // make sure favorite is found
    if (!favorite) throw new Error("No favorite found.");
    // make sure list belongs to user
    if (favorite.user.id !== ctx.request.userId) {
      throw new Error("This isn't your favorites list.");
    }
    // Remove favorite total donations from user toal donations
    const user = await ctx.db.query.user({
      where: {
        id: favorite.user.id
      }
    });
    const newUserTotal = user.totalDonated - favorite.totalDonatedToFavorite;
    await ctx.db.mutation.updateUser({
      where: {
        id: favorite.user.id
      },
      data: {
        totalDonated: newUserTotal
      }
    });
    // delete item from list
    return ctx.db.mutation.deleteFavorite(
      {
        where: { id: args.id }
      },
      info
    );
  },

  async addDonation(parent, args, ctx, info) {
    // Make sure they're signed in
    if (!ctx.request.userId) {
      throw new Error("You must be signed in to do that.");
    }
    // Update favorite
    const favorite = await ctx.db.query.favorite({
      where: {
        id: args.id
      }
    });
    const newFavoriteTotal = args.amount + favorite.totalDonatedToFavorite;
    await ctx.db.mutation.updateFavorite({
      where: {
        id: args.id
      },
      data: {
        totalDonatedToFavorite: newFavoriteTotal
      }
    });
    // Update user total donations
    const { userId } = ctx.request;
    const user = await ctx.db.query.user({
      where: {
        id: userId
      }
    });
    const newUserTotal = args.amount + user.totalDonated;
    await ctx.db.mutation.updateUser({
      where: {
        id: userId
      },
      data: {
        totalDonated: newUserTotal
      }
    });
    // Add donation to list in favorite
    return await ctx.db.mutation.createDonation(
      {
        data: {
          favorite: {
            connect: { id: args.id }
          },
          amount: args.amount,
          yearDonated: args.yearDonated
        }
      },
      info
    );
  }
};

module.exports = mutations;
