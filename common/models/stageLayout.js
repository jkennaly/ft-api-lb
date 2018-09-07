// stageLayout.js

module.exports = function(StageLayout){


    StageLayout.deleteById = function(id, cb) {
      StageLayout.findById(id).update(deleted, 1, cb);
    }
    StageLayout.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    StageLayout.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

