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

var fs = require('fs')
const template = fs.readFileSync('./server/views/login/login.html', 'utf8')

const loginMiddle = options => function(req, res, next) {

	res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
}


app.get(/authorize\/login/, loginMiddle({
	formHeader: 'FestiGram Login',
	submit: evt => 0,
	imgSrc: '/img/Crowdshot.jpg',
	form: login

}))
app.post(/authorize\/login/, function(req, res, next) {
	//extract the email and password
	//verify against the database and get info needed for jwt
	//return error if login invalid
	//return jwt if info valid

	res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
})
app.get(/authorize\/register/, loginMiddle({
	formHeader: 'FestiGram Registration',
	submit: evt => 0,
	imgSrc: '/img/Crowdshot.jpg',
	form: register

}))
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

}