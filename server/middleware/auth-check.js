// server/middleware/auth-check.js

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()

}


const localProvider = () => jwt({
  secret: process.env.LOCAL_SECRET,
  audience: 'https://festigram.app/api/',
  issuer: 'https://festigram.app',
  algorithms: ['HS256'],
  credentialsRequired: false
})


var authCheck = localProvider()
module.exports = function (options) {
  return authCheck
}