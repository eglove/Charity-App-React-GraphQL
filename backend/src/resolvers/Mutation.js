const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        cts.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        // return to user to browser
        return user;
    },
};

module.exports = Mutation;