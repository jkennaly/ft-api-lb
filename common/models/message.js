// message.js

const _ = require('lodash');

module.exports = function(Message){


/*
    Message.forFestival = function(festivalId, cb) {
      //console.log('Message.festivalConnected  ')
      //get all messages with the festival as a subject
      //get all messages with the series/dates/days/sets/ places/venues as a subject
      //get the srtists in the lineup => get all messages with the artists as a subject
      //get all messages with the above messages as a subject => repeat until zero results
      console.log('Message.forFestival', festivalId)
      const directSubjectPromise = Message.find({
        where: {
          subjectType: 7,
          subject: festivalId
        }
      })
      .then(x => console.log('message forFestival directSubjectPromise') || x)
        .catch(cb)


      const relatedEventsPromise = Message.app.models.Festival.relatedEvents(festivalId, cb)
        //relatedEventsObj has seriesIds, dateIds, dayIds and setIds that need to be checked
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
          return eventMessagePromise
        })
      .then(x => console.log('message forFestival relatedEventsPromise') || x)
        .catch(cb)

      const artistsPromise = Message.app.models.Lineup.find({
        where: {
          festival: festivalId
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
      .then(x => console.log('message forFestival artistsPromise') || x)
        .catch(cb)

      Promise.all([directSubjectPromise, relatedEventsPromise, artistsPromise])
      .then(x => console.log('message forFestival Promises') || x)
        .then((messageArrayArray) => _.flatten(messageArrayArray))
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
        .then(allMessages => cb(null, allMessages))
        .catch((err) => {
          console.log('Message.forFestival error', festivalId, err)
        })

    }
    */
    Message.forArtist = function(artistId, cb) {
      //get all messages with the artist as a subject
      //get all messages with the above messages as a baseMessage
      const directSubjectPromise = Message.find({
        where: {
          subjectType: 2,
          subject: artistId
        }
      })
      Promise.all([directSubjectPromise])
        .then((messageArrayArray) => _.flatten(messageArrayArray))
        .then(baseMessages => {
          const baseIds = baseMessages.map(x => x.id)
          return Message.find({where: {
            baseMessage: {inq: baseIds}
          }})
            .then(discussionMessages => discussionMessages
              //.filter(m => excludeArray.indexOf(m.id) < 0)
              .concat(baseMessages))
        })
        .then(allMessages => cb(null, allMessages))
        .catch(cb)

      //console.log('Message.festivalConnected  Promise all')
    }

    Message.remoteMethod('forArtist', {
      accepts: {arg: 'artistId', type: 'number', required: true},
      returns: { arg: 'data', type: 'array'},
      http: {path: '/forArtist/:artistId', verb: 'get'}
    });

/*
    Message.remoteMethod('forFestival', {
      accepts: {arg: 'festivalId', type: 'number', required: true},
      returns: { arg: 'data', type: 'array'},
      http: {path: '/forFestival/:festivalId', verb: 'get'}
    });
*/
};

