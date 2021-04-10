// server/views/site/List.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

var m = require('mithril')
var render = require('mithril-node-render')

const ListByName = require('./ListByName')
const vm = require('../../vm/vm_list')

var fs = require('fs')
const template = fs.readFileSync('./server/views/site/shell.html', 'utf8')

const List = options =>
	function(req, res, next) {
		const baseUrl = req.app.get('url').replace(/\/$/, '')
		//console.log('req host', baseUrl)
		const url = `/api/${options.apiModel}`
		const opt = Object.assign({}, options, { baseUrl: baseUrl, url: url }, req.params)

		vm(opt)
			.then(data => render(
				m(ListByName, {
					data: data,
					model: opt.apiModel,
					baseRoute: opt.baseRoute
				})
			))
			.then(rendered =>
				res.send(
					template.replace(
						'<div id="component"></div>',
						rendered
					)
				)
			)

			.catch(console.error)
	}

module.exports = List
