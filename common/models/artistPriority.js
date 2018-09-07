// artistPriority.js

module.exports = function(ArtistPriority){


    ArtistPriority.deleteById = function(id, cb) {
      ArtistPriority.findById(id).update(deleted, 1, cb);
    }
    ArtistPriority.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    ArtistPriority.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

