const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {randomBytes} = require("crypto");
const {promisify} = require("util");
const {transport, makeANiceEmail} = require("../mail");
const {hasPermission} = require("../utils");

const oneYearCookie = 1000 * 60 * 60 * 24 * 365;

const Mutation = {
    async createNonProfit(parent, args, ctx, info) {
        // check if user is logged in
        if (!ctx.request.userId) {
            throw new Error("You must be logged in to do that.");
        }

        const nonProfit = ctx.db.mutation.createNonProfit(
            {
                data: {
                    // Creates relationship between nonprofit and user
                    user: {
                        connect: {
                            id: ctx.request.userId,
                        },
                    },
                    ...args
                }
            }, info);

        return nonProfit;
    },

    updateNonProfit(parent, args, ctx, info) {
        // get copy of updates
        const updates = {...args};
        // remove ID from updates (so it won't be updated)
        delete updates.id;
        // run update method
        return ctx.db.mutation.updateNonProfit({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
    },

    updateUser(parent, args, ctx, info) {
        const updates = {...args};
        delete updates.id;
        return ctx.db.mutation.updateUser({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
    },

    async deleteNonProfit(parent, args, ctx, info) {
        const where = {id: args.id};
        // find nonprofit
        const nonProfit = await ctx.db.query.nonProfit({where}, `{id name user{id}}`);
        // check if user has permission to delete
        const addedNonProfit = nonProfit.user.id === ctx.request.userId;
        const hasPermissions = ctx.request.user.permissions.some(permission => ["ADMIN", "NONPROFITDELETE"].includes(permission));
        if (!addedNonProfit && !hasPermissions)
            throw new Error("You don't have permission to delete.");
        // delete it
        return ctx.db.mutation.deleteNonProfit({where}, info);
    },

    async createUser(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        // hash password, 10 argument 'salts' password for unique hashing algorithm
        const password = await bcrypt.hash(args.password, 10);
        // create user in DB
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: {set: ["USER"]}
            },
        }, info);

        // Create JWT token to sign in on sign up
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // set jwt as cookie on response
        ctx.response.cookie("token", token, {
            httpOnly: true,
            maxAge: oneYearCookie,
        });
        // return to user to browser
        return user;
    },

    async signin(parent, {email, password}, ctx, info) {
        // check if there is a user with email
        const user = await ctx.db.query.user({where: {email}});
        if (!user) {
            throw new Error(`No user for ${email}`);
        }
        // check is password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid Password");
        }
        // generate jwt token
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // set cookie with token
        ctx.response.cookie("token", token, {
            httpOnly: true,
            maxAge: oneYearCookie,
        });
        // return the user
        return user;
    },

    signout(parent, args, ctx, info) {
        ctx.response.clearCookie("token");
        return {message: "Goodbye!"};
    },

    async requestReset(parent, args, ctx, info) {

        // Check if this is a real user
        const user = await ctx.db.query.user({where: {email: args.email}});
        if (!user) {
            throw new Error(`No user for ${args.email}`);
        }

        // Set a reset token and expiry on user
        const resetToken = (await promisify(randomBytes)(20)).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: {email: args.email},
            data: {resetToken, resetTokenExpiry}
        });

        // Email them reset token
        const mailResponse = await transport.sendMail({
                from: "glover.ethan@gmail.com",
                to: user.email,
                subject: "Your password reset token.",
                text: `${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`,
                html: makeANiceEmail(`Your password reset link is here!\n\n
                <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
                    Click here to reset your password.
                </a>
            `)
            })
        ;

        // Return the messsage
        return {message: 'Thanks!'}
    },

    async resetPassword(parent, args, ctx, info) {
        // 1. check if the passwords match
        if (args.password !== args.confirmPassword) {
            throw new Error("Yo Passwords don't match!");
        }

        // 2. check if its a legit reset token
        // 3. Check if its expired
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000,
            },
        });
        if (!user) {
            throw new Error('This token is either invalid or expired!');
        }

        // 4. Hash their new password
        const password = await bcrypt.hash(args.password, 10);

        // 5. Save the new password to the user and remove old resetToken fields
        const updatedUser = await ctx.db.mutation.updateUser({
            where: {email: user.email},
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        // 6. Generate JWT
        const token = jwt.sign({userId: updatedUser.id}, process.env.APP_SECRET);

        // 7. Set the JWT cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        // 8. return the new user
        return updatedUser;
    },

    async updatePermissions(parent, args, ctx, info) {
        // 1. Check if they are logged in
        if (!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        // 2. Query the current user
        const currentUser = await ctx.db.query.user(
            {
                where: {
                    id: ctx.request.userId,
                },
            },
            info
        );
        // 3. Check if they have permissions to do this
        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
        // 4. Update the permissions
        return ctx.db.mutation.updateUser(
            {
                data: {
                    permissions: {
                        set: args.permissions,
                    },
                },
                where: {
                    id: args.userId,
                },
            },
            info
        );
    },
};

module.exports = Mutation;