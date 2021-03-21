// common/mixins/context-request.js


'use strict';


const _ = require('lodash');

module.exports = function userstamp(Model, options) {
  Model.createOptionsFromRemotingContext = function(ctx) {
  	//console.log('createOptionsFromRemotingContext', Model.name, _.get(ctx, 'req.user.ftUserId', 0))
    var base = this.base.createOptionsFromRemotingContext(ctx)
    return Object.assign(base, {
      req: ctx.req
    })
  }

};