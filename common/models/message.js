// message.js

module.exports = function(Message){

    Message.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Message.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

