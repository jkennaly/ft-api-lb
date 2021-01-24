'use strict';

module.exports = function(app) {
// Make Mithril happy
if (!global.window) {
  global.window = global.document = global.requestAnimationFrame = undefined
}
 
var m = require('mithril')
var render = require('mithril-node-render')

const login = require('../views/login/Login')
const register = require('../views/login/Register')
const forgot = require('../views/login/ForgotPassword')
const logout = require('../views/login/ConfirmLogout')
const createJwt = require('../../bin/create_jwt')
var mysql = require('mysql2')

var fs = require('fs')
const template = fs.readFileSync('./server/views/login/login.html', 'utf8')

const allowLocalLogins = Boolean(process.env.LOCAL_SECRET)

const con = allowLocalLogins && mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false')


const loginMiddle = options => function(req, res, next) {

	res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
}


app.get(/authorize\/login/, loginMiddle({
	formHeader: 'FestiGram Login',
	//submit: evt => {console.log(evt)},
	imgSrc: '/img/Crowdshot.jpg',
	form: login

}))
app.post(/authorize\/login/, function(req, res, next) {
	if(!allowLocalLogins) return res.status(403).render()
	//extract the email and password
	//verify against the database and get info needed for jwt
	//return error if login invalid
	//return jwt if info valid
	//console.log(req.body)
	createJwt(con, req.body.email, req.body.password, req.body.scopes)
		//.then(x => console.log('create jwt result', x) || x)
		.then(result => {
			console.log('req.hostname', req.get('origin'))
			res.redirect(`${req.get('origin')}/#!/callback?token=${result}`)
			//next()
		})
		.catch(err => {
			console.log('Create JWT Error', err)
			res.status(500)
			next(err)
		})

})
app.get(/authorize\/register/, loginMiddle({
	formHeader: 'FestiGram Registration',
	submit: evt => 0,
	imgSrc: '/img/Crowdshot.jpg',
	form: register
}))
app.post(/authorize\/register/, function(req, res, next) {
	//extract the email, username and password
	//add user (returns the uuid)
	//return error if addition invalid
	//return jwt if addition valid
	res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
})
app.get(/authorize\/forgot/, loginMiddle({
	formHeader: 'FestiGram Password Recovery',
	submit: evt => 0,
	imgSrc: '/img/Crowdshot.jpg',
	form: forgot

}))
app.get(/authorize\/logout/, loginMiddle({
	formHeader: 'FestiGram Logout',
	submit: evt => 0,
	imgSrc: '/img/Crowdshot.jpg',
	form: logout
}))
app.post(/authorize\/revoke/, function(req, res, next) {
	//extract the email, username and password
	//create uuid
	//add to database
	//return error if addition invalid
	//return jwt if addition valid
	res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
})
app.post(/authorize\/refresh/, function(req, res, next) {
	//extract the email, username and password
	//create uuid
	//add to database
	//return error if addition invalid
	//return jwt if addition valid
	res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
})

}