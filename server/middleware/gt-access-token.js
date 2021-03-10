// server/middleware/gt-access-token.js


const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
  
}

module.exports = function(options) {
  return function (req, res, next) {
  	req.accessToken = {}
    const gtt = req.headers['x-gt-access-token']
    if(!gtt) return next()
    jwt.verify(gtt, process.env.GT_ACCESS_SECRET, {
      audience: 'http://festigram/api/',
      issuer: 'http://festigram',
      algorithms: ['HS256']
    }, (err, decoded) => {
      if(err) return next(err)
      req.user.gtt = decoded
      //console.log('gt-access-token mw', req.user, req.headers)
      req.accessToken.user = req.user
      next()

    })
  }
}