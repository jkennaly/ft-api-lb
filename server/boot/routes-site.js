'use strict'

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

var m = require('mithril')
var render = require('mithril-node-render')


const ListByName = require('../views/site/ListByName')
const List = require('../views/site/List')
const Artist = require('../views/site/Artist')
const Festival = require('../views/site/Festival')
const Landing = require('../views/site/Landing')
const Support = require('../views/site/support/Support')
const Request = require('../views/site/support/post/Request')
const Problem = require('../views/site/support/post/Problem')
const Other = require('../views/site/support/post/Other')

var fs = require('fs')
const template = fs.readFileSync('./server/views/site/shell.html', 'utf8')

const cachedGet = require('../../bin/common/cachedGet')
const cachedMon = require('../../bin/common/cachedMon')

const festivalDetail = options =>
	function(req, res, next) {
		//const baseUrl = req.app.get('url').replace(/\/$/, '')
		const baseUrl = `${req.protocol}://${req.get('host')}`
		//console.log('req host', baseUrl)
		const opt = Object.assign({}, options, { baseUrl: baseUrl })

		const params = req.params
	}


const lineupDetail = options =>
	function(req, res, next) {
		const baseUrl = `${req.protocol}://${req.get('host')}`
		//console.log('req host', baseUrl)
		const opt = Object.assign({}, options, { baseUrl: baseUrl })

		cachedGet(`/api/${opt.apiModel}`, { baseURL: baseUrl })
			.then(x => x.data)
			.then(series => series.filter(x => !x.deleted))
			.then(data =>
				res.send(
					template.replace(
						'<div id="component"></div>',
						render.sync(m(options.list, { data: data }))
					)
				)
			)
			.catch(console.error)
	}

module.exports = function(app) {
	app.post(
		'/site/support/request',
		Request(),
		Support(),
		cachedMon
	)
	app.post(
		'/site/support/problem',
		Problem(),
		Support(),
		cachedMon
	)
	app.post(
		'/site/support/other',
		Other(),
		Support(),
		cachedMon
	)
	app.get(
		'/site/',
		cachedMon,
		Landing(),
		cachedMon
	)
	app.get(
		'/site/support',
		cachedMon,
		Support(),
		cachedMon
	)
	app.get(
		/site\/festivals\/?$/,
		cachedMon,
		List({
			apiModel: 'Series',
			baseRoute: '/site/festivals/',
			path: '/site/festivals?page='
		}),
		cachedMon
	)

	//show the most recent festival for that series
	app.get(
		'/site/festivals/:seriesName',
		cachedMon,
		Festival({
		}),
		cachedMon
	)

	app.get(
		'/site/festivals/:seriesName/:festivalYear',
		cachedMon,
		Festival({
		}),
		cachedMon
	)

	app.get(
		/site\/artists\/?$/,
		cachedMon,
		List({
			apiModel: 'Artists',
			baseRoute: '/site/artists/',
			path: '/site/artists?page='
		}),
		cachedMon
	)

	app.get(
		'/site/artists/:artistName',
		cachedMon,
		Artist({
		}),
		cachedMon
	)

	//show the most recent festival for that series that the artist played
	app.get(
		'/site/artists/:artistName/:seriesName',
		lineupDetail({
			list: ListByName,
			apiModel: 'Lineups'
		})
	)

	app.get(
		'/site/artists/:artistName/:seriesName/:festivalYear',
		lineupDetail({
			list: ListByName,
			apiModel: 'Lineups'
		})
	)
}
