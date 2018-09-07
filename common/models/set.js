// set.js

module.exports = function(Set){


    Set.deleteById = function(id, cb) {
      Set.findById(id).update(deleted, 1, cb);
    }
    Set.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Set.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

