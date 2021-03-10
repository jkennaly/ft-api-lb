// common/mixins/access/restrict-viewing.js

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
module.exports = function (Message, options) {
 
    Message.observe('loaded', function event(ctx, next) {
        //console.log('restrict-viewing ctx', Object.keys(ctx), ctx.data)
        const rawMessage = ctx.data
        //if the message is just being created, let it go
        if(!rawMessage.id) return next()
        const subject = rawMessage.baseMessage ? rawMessage.baseSubject : rawMessage.subject
        const subjectType = rawMessage.baseMessage ? rawMessage.baseSubjectType : rawMessage.subjectType
        const activeEvents = Message.app.get('activeEvents')
        const active = activeEvents[subs[subjectType]] && activeEvents[subs[subjectType]].includes(subject)
        if(!active) return next()
        const readerId = ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId
        const gtt = ctx.options.req && ctx.options.req.user && ctx.options.req.user.gtt
        //console.log('restrict-viewing readerId/gtt', readerId, gtt)
        if(!readerId || !gtt || readerId !== gtt.sub) {
          ctx.data = undefined
          return next()

        }
        const fullAccess = gtt.full
        const evtAccess = fullAccess || gtt[gttEvents[subjectType]].includes(subject)
        if(!evtAccess) ctx.data = undefined
        next()
    })
}