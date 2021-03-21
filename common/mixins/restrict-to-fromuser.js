// common/mixins/restrict-to-fromuser.js


'use strict'


const _ = require('lodash')

module.exports = function byUser(Model, options) {
 
  Model.observe('loaded', function event(ctx, next) {

    // get current user ID
    const viewerId = ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId
    const admin = viewerId && ctx.options.req.user.scope.includes('create:festivals')



    //console.log('by-user mixin user ' + viewerId)
    //console.log('by-user mixin data ', ctx.data)

    if(admin || ctx.data.fromuser === viewerId || !_.isArray(ctx.data)) return next()
    ctx.data = ctx.data.filter(d => viewerId === d.fromuser)
    

    // next callback in the stack.
    next()
  });
};