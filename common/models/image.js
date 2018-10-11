// image.js

const re = /image/g

module.exports = function(Image){

  Image.validatesFormatOf('url', {with: re, message: 'Not read an image'})
    Image.deleteById = function(id, cb) {
      Image.findById(id).update(deleted, 1, cb);
    }
    Image.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Image.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};

