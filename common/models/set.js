// set.js

module.exports = function(Set){

    Set.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Set.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

