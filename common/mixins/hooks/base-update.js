// common/mixins/hooks/base-update.js


'use strict';

const _ = require('lodash')

const suspectSubjectTypes = [
9,
8,
7,
3,
]
//Model.app.models.Festival
const evts = {
    Set: 3,
    Day: 7,
    Date: 8,
    Festival: 9
}
const subs = {
    3: "Set",
    7: "Day",
    8: "Date",
    9: "Festival"
}
const gttEvents = {
    3: "sets",
    7: "days",
    8: "dates",
    9: "festivals"
}
var clearSubjects = {}
var clearBaseMessages = []

module.exports = function baseupdate(Model, options) {
 
  Model.observe('before save', function event(ctx, next) {


    // get current user ID
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
      })
        .then(() => {
          const rawMessage = ctx[ctxField]
          const subject = rawMessage.baseMessage ? rawMessage.baseSubject : rawMessage.subject
          const subjectType = rawMessage.baseMessage ? rawMessage.baseSubjectType : rawMessage.subjectType
          const activeEvents = Message.app.get('activeEvents')
          const active = activeEvents[subs[subjectType]] && activeEvents[subs[subjectType]].includes(subject)
          if(!active) return next()
          const readerId = ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId
          const gtt = ctx.options.req && ctx.options.req.user && ctx.options.req.user.gtt
          //console.log('restrict-viewing readerId/gtt', readerId, gtt)
          if(!readerId || !gtt || readerId !== gtt.sub) {
            delete ctx[ctxField]
            return next()
          }
          const fullAccess = gtt.full
          const evtAccess = fullAccess || gtt[gttEvents[subjectType]].includes(subject)
          if(!evtAccess) delete ctx[ctxField]
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