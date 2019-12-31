const {forwardTo} = require('prisma-binding');

const Query = {

    users: forwardTo('db'),
    nonProfits: forwardTo('db'),
    user: forwardTo('db'),
    nonProfit: forwardTo('db'),
    usersConnection: forwardTo('db'),
    nonProfitsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // Check if there is a current user id
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user({
            where: {id: ctx.request.userId}
        }, info);
    }
};

module.exports = Query;