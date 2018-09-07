// day.js

module.exports = function(Day){


    Day.deleteById = function(id, cb) {
      Day.findById(id).update(deleted, 1, cb);
    }
    Day.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Day.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

