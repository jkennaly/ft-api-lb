// lineup.js

module.exports = function(Genre){


    Genre.deleteById = function(id, cb) {
      Genre.findById(id).update(deleted, 1, cb);
    }
    Genre.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Genre.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

