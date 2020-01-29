const {forwardTo} = require('prisma-binding');
const {hasPermission} = require('../utils');

const Query = {
    // async charities(parent, args, ctx, info) {
    //     const charities = await ctx.db.query.charities();
    //     return charities;
    // }
    charities: forwardTo('db'),
    charity: forwardTo('db'),
    donation: forwardTo('db'),
    charitiesConnection: forwardTo('db'),
    donations: forwardTo('db'),
    async me(parent, args, ctx, info) {
        // check if a user is logged in
        if (!ctx.request.userId) {
            return null;
        }
        return await ctx.db.query.user({
            where: {id: ctx.request.userId}
        }, info);
    },
    async users(parent, args, ctx, info) {
        // check if user is logged in
        if(!ctx.request.userId) {
            throw new Error("You must be logged in.");
        }

        // check if user has permission to query all users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

        // if they do, query all the users
        return ctx.db.query.users({}, info);
    },
};

module.exports = Query;
