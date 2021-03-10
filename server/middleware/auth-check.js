

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
  
}


const auth0Provider = () => jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://festivaltime.auth0.com/.well-known/jwks.json"
    }),
    //audience: 'https://immense-ridge-26505.herokuapp.com/api/',
    issuer: 'https://festivaltime.auth0.com/',
    algorithms: ['RS256'],
    credentialsRequired: false
})

const localProvider = () => jwt({
  secret: process.env.LOCAL_SECRET,
    audience: 'http://festigram/api/',
    issuer: 'http://festigram',
    algorithms: ['HS256'],
    credentialsRequired: false
})


var authCheck = process.env.LOCAL_SECRET ? localProvider() : auth0Provider()
module.exports = function(options) {
  return authCheck
}