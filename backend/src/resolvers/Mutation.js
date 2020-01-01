const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');

const oneYearCookie = 1000 * 60 * 60 * 24 * 365;

const Mutation = {
    async createNonProfit(parent, args, ctx, info) {
        const nonProfit = ctx.db.mutation.createNonProfit(
            {
                data: {
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
        const nonProfit = await ctx.db.query.nonProfit({where}, `{id, name}`);
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
                permissions: {set: ['USER']}
            },
        }, info);

        // Create JWT token to sign in on sign up
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // set jwt as cookie on response
        ctx.response.cookie('token', token, {
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
        if(!valid) {
            throw new Error('Invalid Password');
        }
        // generate jwt token
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // set cookie with token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: oneYearCookie,
        });
        // return the user
        return user;
    },

    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Goodbye!'};
    },

    async requestReset(parent, args, ctx, info) {
        // Check if this is a real user
        const user = await ctx.db.query.user({where: {email: args.email}});
        if(!user) {
            throw new Error(`No user for ${args.email}`);
        }
        // Set a reset token and expiry on user
        const resetToken = (await promisify(randomBytes)(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: {email: args.email},
            data: {resetToken, resetTokenExpiry}
        });
        return {message: 'Thanks!'}
        // Email them reset token
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
            where: { email: user.email },
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        // 6. Generate JWT
        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
        // 7. Set the JWT cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // 8. return the new user
        return updatedUser;
    },
};

module.exports = Mutation;