// common/mixins/restrict-from-others.js


'use strict';


const _ = require('lodash');

module.exports = function byUser(Model, options) {
 
  Model.observe('loaded', function event(ctx, next) {

    // get current user ID
    const viewerId = ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId;



    //console.log('by-user mixin user ' + viewerId)
    //console.log('by-user mixin data ', ctx.data)

    if(ctx.data.id === viewerId) return next()
    if(!_.isArray(ctx.data)) {
        ctx.data = _.pick(ctx.data, ['username', 'picture', 'id'])
        return next()
    }
    ctx.data = ctx.data.map(d => viewerId === d.id ? d : _.pick(d, ['username', 'picture', 'id', 'timestamp', 'deleted']))
    


    // next callback in the stack.
    next();
  });
};