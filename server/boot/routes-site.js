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
const Landing = require('../views/site/Landing')

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
	app.get(
		'/site/',
		cachedMon,
		Landing(),
		cachedMon
	)
	app.get(
		/site\/festivals/,
		cachedMon,
		List({
			apiModel: 'Series',
			baseRoute: '/site/festivals/'
		}),
		cachedMon
	)

	//show the most recent festival for that series
	app.get(
		'/site/festivals/:seriesName',
		festivalDetail({
			list: ListByName,
			apiModel: 'Series'
		})
	)

	app.get(
		'/site/festivals/:seriesName/:year',
		festivalDetail({
			list: ListByName,
			apiModel: 'Series'
		})
	)

	app.get(
		/site\/artists\/?$/,
		cachedMon,
		List({
			apiModel: 'Artists',
			baseRoute: '/site/artists/'
		}),
		cachedMon
	)

	app.get(
		'/site/artists/:artistName',
		cachedMon,
		Artist({
			list: ListByName,
			apiModel: 'Artists'
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
		'/site/artists/:artistName/:seriesName/:year',
		lineupDetail({
			list: ListByName,
			apiModel: 'Lineups'
		})
	)
}
