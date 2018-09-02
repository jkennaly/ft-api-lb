'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var app = module.exports = loopback();


var authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://festivaltime.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://immense-ridge-26505.herokuapp.com/api/',
    issuer: 'https://festivaltime.auth0.com/',
    algorithms: ['RS256']
})
  .unless({path: ['', '/', '/bundle.js']});


app.use(authCheck);

/*
// apply to a path
app.use('/api/Festivals', function(req, res, next) {
    res.json("It has valid token", req.user);
});
*/
// catch error
app.use(function (err, req, res, next) {
    if (err && err.name === 'UnauthorizedError') {
        console.log('Invalid token, or no token supplied!')
        console.log(req.get('Authorization'))
        console.log(err)
        res.status(401).send('Invalid token, or no token supplied!');
    } else if(err) {
        console.log(err)
        res.status(401).send(err);
    }
});



//var MYSQL_CONNECTION_STRING = process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : ''
//console.log(process.env.JAWSDB_URL)
app.start = function() {
  // start the web server
   var port = process.env.PORT || 8080;
  return app.listen(port, function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
