// series.js

module.exports = function(Series){


    Series.deleteById = function(id, cb) {
      Series.findById(id).update(deleted, 1, cb);
    }
    Series.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Series.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

