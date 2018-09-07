// message.js

module.exports = function(Message){


    Message.deleteById = function(id, cb) {
      Message.findById(id).update(deleted, 1, cb);
    }
    Message.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Message.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

