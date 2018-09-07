// organizer.js

module.exports = function(Organizer){


    Organizer.deleteById = function(id, cb) {
      Organizer.findById(id).update(deleted, 1, cb);
    }
    Organizer.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Organizer.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

