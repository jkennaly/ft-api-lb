// placeType.js

module.exports = function(PlaceType){


    PlaceType.deleteById = function(id, cb) {
      PlaceType.findById(id).update(deleted, 1, cb);
    }
    PlaceType.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    PlaceType.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

