'use strict';



module.exports = function (app) {
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
	const verifyRefresh = require('../../bin/verify_refresh')
	const createRefresh = require('../../bin/create_refresh')
	const createAccess = require('../../bin/create_access')
	const addUser = require('../../bin/add_user')
	const getUser = require('../../bin/get_user')
	var mysql = require('mysql2')

	var fs = require('fs')
	const template = fs.readFileSync('./server/views/login/login.html', 'utf8')

	const allowLocalLogins = Boolean(process.env.LOCAL_SECRET)



	const loginMiddle = options => function (req, res, next) {

		const reqCb = decodeURIComponent(req.query.cb)
		const reqDomainArray = typeof reqCb === 'string' && /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/.exec(reqCb)
		const reqDomain = reqDomainArray && reqDomainArray[0]
		const cbDomainOk = reqDomain && ((reqDomain.indexOf('festigram.app') === (reqDomain.length - 13) || reqDomain.includes(req.hostname)))
		console.log('req cb', reqCb, cbDomainOk, reqDomain, reqDomainArray)
		if (cbDomainOk) res.cookie('cbd', reqCb, {
			httpOnly: true,
			sameSite: 'None', secure: true,
			maxAge: 24 * 60 * 60 * 1000
		});

		res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
	}

	app.get(/authorize\/login/, loginMiddle({
		formHeader: 'FestiGram Login',
		//submit: evt => {console.log(evt)},
		imgSrc: '/img/Crowdshot.jpg',
		form: login

	}))
	app.post(/authorize\/login/, async function (req, res, next) {
		if (!allowLocalLogins) return res.status(403).render()
		const con = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false')
		try {
			const user = await getUser(con, req.body.email, req.body.password)
			//console.log('routes-auth-local user', user)
			const access = createAccess(req.body.scopes, user)
			const refresh = createRefresh(user)
			res.cookie('jwt', refresh, {
				httpOnly: true,
				sameSite: 'None', secure: true,
				maxAge: 90 * 24 * 60 * 60 * 1000
			});
			const storedCb = req.cookies && req.cookies.cbd
			const cbUrl = storedCb ?? `${req.get('origin')}/site`
			res.redirect(`${cbUrl}?token=${access}`)
		} catch (err) {
			console.log('Create JWT Error', err)
			res.status(500)
			next(err)

		} finally {
			con.end()
		}
	})
	app.get(/authorize\/register/, loginMiddle({
		formHeader: 'FestiGram Registration',
		submit: evt => 0,
		imgSrc: '/img/Crowdshot.jpg',
		form: register
	}))
	app.post(/authorize\/register/, async function (req, res, next) {

		if (!allowLocalLogins) return res.status(403).render()
		//console.log(req.body)
		try {
			const con = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false')
			const user = await addUser(con, req.body.Username, req.body.Email, req.body.Password)
			const token = await createAccess(undefined, user)
			con.end()
			res.redirect(`${req.get('origin')}/#!/callback?token=${token}`)
		} catch (err) {
			console.log('Create JWT Error', err)
			res.status(500)
			next(err)
		}
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
	app.post(/authorize\/revoke/, function (req, res, next) {
		//extract the email, username and password
		//create uuid
		//add to database
		//return error if addition invalid
		//return jwt if addition valid
		res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
	})
	app.get(/authorize\/refresh/, async function (req, res, next) {
		if (!allowLocalLogins || !req.cookies || !req.cookies.jwt) {
			res.status(403)
			console.log('no cookie', req.cookies)
			next(new Error('refresh unavailable'))
		} else {

			const refreshToken = req.cookies.jwt
			const con = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false')
			try {
				const refreshId = await verifyRefresh(con, refreshToken)
				if (!refreshId) throw 'unrefreshable'
				const user = await getUser(con, undefined, undefined, refreshId)
				const token = createAccess(undefined, user)
				console.log('valid token')
				res.status(200).json({ token })
			} catch (err) {
				if (err === 'unrefreshable') {
					console.log('unrefreshable')
					res.redirect(`${req.get('origin')}/authorize/logout`)

				} else {

					console.log('Create JWT Error', err)
					res.status(500)
					console.log('cretae error')
					next(err)

				}
			}
			con.end()
		}
		console.log('completion')
	})

}