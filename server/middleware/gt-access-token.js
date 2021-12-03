// server/middleware/gt-access-token.js


const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
  
}

module.exports = function(options) {
  return function (req, res, next) {
  	console.log('gt-access-token', req.user)
  	req.accessToken = {}
    const gtt = req.headers['x-gt-access-token']
    if(!gtt) return next()
    jwt.verify(gtt, process.env.GT_ACCESS_SECRET, {
      audience: 'http://festigram/api/',
      issuer: 'http://festigram',
      algorithms: ['HS256']
    }, (err, decoded) => {
      if(err) return next()
      //console.log('gt-access-token mw', req.user, req.headers)
      //console.log('gt-access-token', decoded)
      req.user.gtt = decoded
      req.accessToken.user = req.user
      next()

    })
  }
}