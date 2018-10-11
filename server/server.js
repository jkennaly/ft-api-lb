'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

const mysql = require('mysql2');
const _ = require('lodash');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = module.exports = loopback();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://festivaltime.auth0.com/.well-known/jwks.json"
    }),
    //audience: 'https://immense-ridge-26505.herokuapp.com/api/',
    issuer: 'https://festivaltime.auth0.com/',
    algorithms: ['RS256']
})
  .unless({path: [/^((?!api).)*$/g]});

var guard = require('express-jwt-permissions')({
  permissionsProperty: 'scope'
})

var aliasTable = {}

app.use(authCheck);
app.post(/^((?!Messages).)*$/g, guard.check('create:festivals'))
app.put(/^((?!Messages).)*$/g, guard.check('create:festivals'))
app.delete(/^((?!Messages).)*$/g, guard.check('create:festivals'))
app.use(/verify/g, guard.check('verify:festivals'))

app.post(/Messages/g, guard.check('create:messages'))
app.put(/Messages/g, guard.check('create:messages'))
app.delete(/Messages/g, guard.check('admin'))
app.use(/admin/g, guard.check('admin'))

//user request has passed security, now get ftUserId
app.use('/api/*', function (req, res, next) {
  const authId = req.user.sub
  var foundAlias = aliasTable[authId]
  if(!foundAlias) {
    //get highest id in alias Table
    const highId = _.reduce(aliasTable, (hi, el) => el && el > hi ? el : hi, 0)
    //load all aliases with ids higher
    
    const connection = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=2&debug=false');
    connection.execute(
      'SELECT * FROM `user_aliases` WHERE `id` > \'?\'',
      highId,
      (err, results, fields) => {
        if(err) return next(err)
          const resultPairs = results.map(r => [r.alias, r.user])
          _.assign(aliasTable, _.fromPairs(resultPairs))
          req.user.ftUserId = aliasTable[authId]
          //console.log('using loaded alias')
          //console.log(req.user)
          next()
      }
    )
    connection.end()
  } else {
    req.user.ftUserId = foundAlias
    //console.log('using cached alias')  
    //console.log(req.user)
    next()
  }

});

/*
// apply to a path
app.use('/api/Festivals', function(req, res, next) {
    res.json("It has valid token", req.user);
});
*/

/*
app.use('/api/*', function (req, res, next) {
  console.log(req.user)
  next()
});
*/

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer().any()); // for parsing multipart/form-data

// catch error
app.use(function (err, req, res, next) {
    if (err && err.name === 'UnauthorizedError') {
      //authCheck
        console.log('Invalid token, or no token supplied!')
        console.log(req.get('Authorization'))
        console.log(req.user)
        console.log(err)
        res.status(401).send('Invalid token, or no token supplied!');
    } else if (err.code === 'permission_denied') {
      //guard
      res.status(403).send('Forbidden');
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
    /*
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    */
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
