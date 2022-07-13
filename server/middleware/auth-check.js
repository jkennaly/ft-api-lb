// server/middleware/auth-check.js

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()

}


const authCheck = (req, res, next) => jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/keys`
  }),
  audience: 'https://festigram.app/api/',
  issuer: 'https://festigram.app',
  algorithms: ['RS256'],
  credentialsRequired: false
})(req, res, next)


module.exports = function (options) {
  return authCheck
}