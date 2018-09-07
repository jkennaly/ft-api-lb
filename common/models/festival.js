// festival.js

module.exports = function(Festival){


    Festival.deleteById = function(id, cb) {
      Festival.findById(id).update(deleted, 1, cb);
    }
    Festival.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Festival.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

