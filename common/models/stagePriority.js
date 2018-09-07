// stagePriority.js

module.exports = function(StagePriority){


    StagePriority.deleteById = function(id, cb) {
      StagePriority.findById(id).update(deleted, 1, cb);
    }
    StagePriority.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    StagePriority.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

