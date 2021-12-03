"use strict"

var loopback = require("loopback")
var boot = require("loopback-boot")
//var unless = require('express-unless')

const _ = require("lodash")

var bodyParser = require("body-parser")
var multer = require("multer")

var sslRedirect = require("heroku-ssl-redirect")

var app = (module.exports = loopback())

if (process.env.NODE_ENV !== "production") {
	require("dotenv").load()
} else {
	app.use(sslRedirect())
	app.use(function(req, res, next) {
		if (!/festigram\.app$/.test(req.headers.host)) {
			const newURL = ["https://festigram.app", req.url].join("")
			return res.redirect(newURL)
		}
		next()
	})
}

var guard = require("express-jwt-permissions")({
	permissionsProperty: "scope"
})
//guard.unless = unless

const createFestivals = [
	/Artists/,
	/ArtistAliases/,
	/^.*Dates((?!buy).)*$/gm,
	/^.*Days((?!buy).)*$/gm,
	/^.*Festivals((?!buy).)*$/gm,
	/Lineups/,
	/Organizers/,
	/ParentGenres/,
	/Series/,
	/Sets/,
	/StageLayouts/,
	/StagePriorities/,
	/ArtistPriorities/,
	/Venues/,
	/MessageTypes/,
	/PlaceTypes/,
	/SubjectTypes/
]
const buyEvents = [/Dates.*buy$/gm, /Days.*buy$/gm, /Festivals.*buy$/gm]

const createMessages = [
	/ArtistGenres/,
	/Genres/,
	/Images/,
	/Intentions/,
	/Interactions/,
	/Messages/,
	/MessagesMonitors/,
	/Places/,
	/Profiles/,
	/Flags/
]

const loggedOnly = [/Intentions/, /MessagesMonitors/, /Flags/]

const admin = []

const authorize = [/authorize/]

const liveAccess = [/Messages/]

/*
app.put('*', (req, res, next) => {
  console.log('put incoming')
  next()
})
app.get('*', (req, res, next) => {
  console.log('get incoming')
  next()
})
app.post('*', (req, res, next) => {
  console.log('post incoming')
  next()
})
*/

app.post(createFestivals, guard.check("create:festivals"))
app.put(createFestivals, guard.check("create:festivals"))
app.delete(createFestivals, guard.check("create:festivals"))
//app.use(/verify/g, guard.check('verify:festivals'))
app.get(loggedOnly, function(err, req, res, next) {
	if (err) return next(err)
	if (req.user) return next()
	res.status(401).send("Logged only for this endpoint")
})
app.post(buyEvents, guard.check("create:messages"))
app.get(loggedOnly, guard.check("create:messages"))
app.post(
	createMessages,
	guard.check("create:messages").unless({ path: "/api/Profiles/bucks/fulfill" })
)

app.put(createMessages, guard.check("create:messages"))
app.delete(createMessages, guard.check("create:messages"))

//app.post(admin, guard.check('create:messages'))
app.put(guard.check("create:messages"))
app.delete(guard.check("create:messages"))
app.patch(guard.check("create:messages"))

//user request has passed security, now get ftUserId

/*
// apply to a path
app.use('/*', function(req, res, next) {
  console.log('server.js 128 req ')
  //console.log(aliasTable)
  next()
})
app.use('/api/Festivals', function(req, res, next) {
    res.json("It has valid token", req.user);
});
app.use('/api/*', function (req, res, next) {
  console.log(req.user)
  next()
});
*/
/*
app.patch('*', (req, res, next) => {
  console.log('patch incoming', req.user)
  next()
})
*/
app.use((req, res, next) => {
	if (req.originalUrl === "/api/Profiles/bucks/fulfill") {
		//console.log('fulfilling', req.originalUrl)
		bodyParser.raw({ type: "*/*" })(req, res, next)
		//next();
	} else {
		//console.log('not fulfilling', req.originalUrl)
		bodyParser.json()(req, res, next)
	}
}) // for parsing application/json
app.use((req, res, next) => {
	if (req.originalUrl === "/api/Profiles/bucks/fulfill") {
		//console.log('fulfilling', req.originalUrl)
		next()
	} else {
		//console.log('not fulfilling', req.originalUrl)
		bodyParser.urlencoded({ extended: true })(req, res, next)
	}
}) // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
	if (req.originalUrl === "/api/Profiles/bucks/fulfill") {
		//console.log('fulfilling', req.originalUrl)
		next()
	} else {
		//console.log('not fulfilling', req.originalUrl)
		multer().any()(req, res, next)
	}
}) // for parsing multipart/form-data

// catch error
app.use(function(err, req, res, next) {
	if (err && err.name === "UnauthorizedError") {
		//authCheck
			console.log('Invalid token, or no token supplied!')
			console.log(req.route)
			console.log(req.get('Authorization'))
			console.log(req.user)
			console.log(err)
		if (!/jwt expired/.test(err.message)) {
		}
		res.status(401).send("Invalid token, or no token supplied!")
	} else if (err.code === "permission_denied") {
		//guard
		res.status(403).send("Forbidden")
	} else if (err) {
		console.log(err)
		res.status(401).send(err)
	}
})

//var MYSQL_CONNECTION_STRING = process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : ''
//console.log(process.env.JAWSDB_URL)
app.start = function() {
	// start the web server
	var port = process.env.PORT || 8080
	return app.listen(port, function() {
		app.emit("started")
		var baseUrl = app.get("url").replace(/\/$/, "")
		console.log("Web server listening at: %s", baseUrl)

		/*
    if (process.env.NODE_ENV === 'test' && app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    */
	})
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
	if (err) throw err

	// start the server if `$ node server.js`
	if (require.main === module) app.start()
})
