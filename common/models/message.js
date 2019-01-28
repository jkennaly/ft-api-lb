// message.js

const _ = require('lodash');

module.exports = function(Message){


    Message.deleteById = function(id, cb) {
      Message.findById(id).update(deleted, 1, cb);
    }
    Message.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }
    Message.festivalConnected = function(id, cb) {
      /*
      const logTime = (() => {
        const startTime = new Date()
        return description => result => {
          console.log(description)
          console.log('elapsed ms since Message.festivalConnected ' + ((new Date()) - startTime))
          return result
        }
      })()
      */

      //console.log('Message.festivalConnected  ')
      //get all messages with the festival as a subject
      //get all messages with the series/dates/days/sets/ /*places/venues*/ as a subject
      //get the srtists in the lineup => get all messages with the artists as a subject
      //get all messages with the above messages as a subject => repeat until zero results
      const directSubjectPromise = Message.find({
        where: {
          subjectType: 7,
          subject: id
        }
      })
        //.then(logTime('directSubjectPromise'))


      //console.log('Message.festivalConnected  directSubjectPromise')
      const relatedEventsPromise = Message.app.models.Festival.relatedEvents(id, cb)
        //relatedEventsObj has seriesIds, dateIds, dayIds and setIds that need to be checked
        //.then(logTime('relatedEventsPromise'))
        .then(relatedEventsObj => {      
          const eventMessagePromise = Message.find({
            where: {
              
              or: [
                {
                  subjectType: 6,
                  subject: { inq: relatedEventsObj.seriesIds}
                },
                {
                  subjectType: 8,
                  subject: { inq: relatedEventsObj.dateIds}
                },
                {
                  subjectType: 9,
                  subject: { inq: relatedEventsObj.dayIds}
                },
                {
                  subjectType: 3,
                  subject: { inq: relatedEventsObj.setIds}
                }
              ]
            }
          })
            //.then(logTime('relatedEvents Promise.all'))
          /*
          const seriesPromise = Message.find({
            where: {
              subjectType: 6,
              subject: { inq: relatedEventsObj.seriesIds}
            }
          })
          const datePromise = Message.find({
            where: {
              subjectType: 8,
              subject: { inq: relatedEventsObj.dateIds}
            }
          })
          const dayPromise = Message.find({
            where: {
              subjectType: 9,
              subject: { inq: relatedEventsObj.dayIds}
            }
          })
          const setPromise = Message.find({
            where: {
              subjectType: 3,
              subject: { inq: relatedEventsObj.setIds}
            }
          })
          return Promise.all([seriesPromise, datePromise, dayPromise, setPromise])
            .then((messageArrayArray) => _.flatten(messageArrayArray))
            //.then(logTime('relatedEvents Promise.all'))
          */
          return eventMessagePromise
        })
        .catch(cb)

      //console.log('Message.festivalConnected  relatedEventsPromise')
      const artistsPromise = Message.app.models.Lineup.find({
        where: {
          festival: id
        }
      })
        .then(lineups => {
          const artistIds = lineups.map(x => x.band)
          return Message.find({
            where: {
              subjectType: 2,
              subject: { inq: artistIds}
            }
          })
        })
        .catch(cb)

      //console.log('Message.festivalConnected  artistsPromise')
      Promise.all([directSubjectPromise, relatedEventsPromise, artistsPromise])
        .then((messageArrayArray) => _.flatten(messageArrayArray))
        //.then(messageArray => messageArray.filter(m => excludeArray.indexOf(m.id) < 0))
        //Now all the messages with the festival as a subject have been collected
        //Grab their descendants

        //.then(logTime('baseMessages found'))
        .then(baseMessages => {
          const baseIds = baseMessages.map(x => x.id)
          return Message.find({where: {
            baseMessage: {inq: baseIds}
          }})
            .then(discussionMessages => discussionMessages
              //.filter(m => excludeArray.indexOf(m.id) < 0)
              .concat(baseMessages))
        })
        //.then(logTime('allMessages found'))
        .then(allMessages => cb(null, allMessages))
        .catch(cb)

      //console.log('Message.festivalConnected  Promise all')
    }


    Message.forFestival = function(festivalId, cb) {

      ////console.log('Message.forDay')
      ////console.log(dayId)
      ////console.log(data)

      //data.messages is the excludeArray, the messages already on the client
      Message.festivalConnected(festivalId, cb)

      
    // the files are available as req.files.
    // the body fields are available in req.body
    //cb(null, 'OK');
    }


    Message.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });

    Message.remoteMethod('forFestival', {
      accepts: {arg: 'festivalId', type: 'number', required: true},
      returns: { arg: 'data', type: 'array'},
      http: {path: '/forFestival/:festivalId'}
    });
};

