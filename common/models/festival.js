// festival.js

module.exports = function(Festival){

    Festival.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Festival.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

