// common/mixins/hooks/base-update.js


'use strict';


const _ = require('lodash');

module.exports = function fromuserstamp(Model, options) {
 
  Model.observe('before save', function event(ctx, next) {


    // get current user ID
    const authorId = ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId;
    const ctxField = ctx.instance ? 'instance' : 'data'
    //console.log('base-update mixin user', authorId, ctxField, ctx[ctxField])

    const hasBaseMessage = Boolean(ctx[ctxField].baseMessage)
    if(!hasBaseMessage) return next()
    Model.find({where: {id: ctx[ctxField].baseMessage}})
      .then(([b, ...rest]) => {
        //console.log('base-update Model.find', b)
        if(!b) {
          //console.log('base-update', ctxField, ctx[ctxField])
          throw new Error('No base Message')
        }
        ctx[ctxField].baseSubject = b.subject
        ctx[ctxField].baseSubjectType = b.subjectType
        ctx[ctxField].baseMessageType = b.messageType
        next()
      })
      .catch(err => {
        delete ctx[ctxField]
        next({
            message: err.message,
            status: 422,
        statusCode: 422
        })

      })

  });
};