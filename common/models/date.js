// date.js

module.exports = function(Date){

    Date.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Date.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

