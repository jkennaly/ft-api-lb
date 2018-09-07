// venue.js

module.exports = function(Venue){


    Venue.deleteById = function(id, cb) {
      Venue.findById(id).updateAttribute(deleted, 1, cb);
    }
    Venue.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Venue.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

