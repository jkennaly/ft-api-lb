// message.js

const _ = require('lodash');

module.exports = function(Message){


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

};

