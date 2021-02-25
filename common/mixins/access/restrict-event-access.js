// common/mixins/access/restrict-event-access.js



'use strict';

const restrictedSubjectTypes = [
9,
8,
7,
3,
]


const _ = require('lodash')

var jwt = require('express-jwt')

const localProvider = () => jwt({
  secret: process.env.GT_ACCESS_SECRET,
    audience: 'http://festigram/api/',
    issuer: 'http://festigram',
    algorithms: ['HS256'],
    credentialsRequired: false
})
//Message Restriction Class I: subjectType is FESTIVAL, DATE, DAY or SET
//Message Restriction Class II: subjectType is MESSAGE and baseMessage > 0
//Unrestricted: all other messages

//Message Restriction Status: Inactive
//Message Restriction Status Active: 
    //the event is a FESTIVAL and has at least one active date OR
    //the event traces to an active DATE
const unrestricted = message => !restrictedSubjectTypes.includes(message.subject_type) && message.subject_type !== 10

const filterClass1 = decodedToken => message => {
    //user has access OR
    //subject is inactive

}

const decode = (rawToken, userId) => {
    if(!rawToken || !userId) return {
        full: false,
        3: [],
        7: [],
        8: [],
        9:[]
    }
    //verify validity
    //decode token
    //verify identity

}


module.exports = function byUser(Message, options) {
 
  Message.observe('loaded', function event(ctx, next) {
    //sort messages by message class



    // get current user ID
    const authorId = ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId

    //decode and verify the gt-token
    //find if this event is active or future
    //if this event is past return next()



    // next callback in the stack.
    next();
  });
};