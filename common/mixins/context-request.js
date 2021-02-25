// common/mixins/context-request.js


'use strict';


const _ = require('lodash');

module.exports = function userstamp(Model, options) {
  Model.createOptionsFromRemotingContext = function(ctx) {
    var base = this.base.createOptionsFromRemotingContext(ctx)
    return Object.assign(base, {
      req: ctx.req
    })
  }

};