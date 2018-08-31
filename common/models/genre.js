// lineup.js

module.exports = function(Lineup){

    Lineup.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Lineup.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

