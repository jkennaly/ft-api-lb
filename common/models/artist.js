// artist.js

module.exports = function(Artist){

    Artist.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Artist.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

