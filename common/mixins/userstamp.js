// common/mixins/userstamp.js


'use strict';


const _ = require('lodash');

module.exports = function userstamp(Model, options) {
 
  Model.observe('before save', function event(ctx, next) {

    // get current user ID
    const authorId = Model.app.get('ftUserId');

    //console.log('by-user mixin user ' + authorId)
    //console.log('by-user mixin query ')
    if (ctx.instance) {
        ctx.instance.user =
          ctx.instance.user || authorId;
      } else {
        ctx.data.user =
          ctx.data.user || authorId;
      }


    // next callback in the stack.
    next();
  });
};