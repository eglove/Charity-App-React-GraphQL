const {forwardTo} = require('prisma-binding');
const {hasPermission} = require('../utils');

const Query = {

    users: forwardTo('db'),
    nonProfits: forwardTo('db'),
    user: forwardTo('db'),
    nonProfit: forwardTo('db'),
    usersConnection: forwardTo('db'),
    nonProfitsConnection: forwardTo('db'),

    me(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user(
            {
                where: { id: ctx.request.userId },
            },
            info
        );
    },

    async users(parent, args, ctx, info) {
        // check if user is logged in
        if(!ctx.request.userId) {
            throw new Error('You must be logged in.');
        }
        // check if user has permissions to query all users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
        // if they do, query all users
        return ctx.db.query.users({}, info);
    }
};

module.exports = Query;