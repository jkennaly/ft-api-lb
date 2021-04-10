// image.js

const re = /image/g

module.exports = function(Image){

  Image.validatesFormatOf('url', {with: re, message: 'Not read an image'})

};

