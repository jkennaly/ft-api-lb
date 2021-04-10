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
		const baseUrl = `${req.protocol}://${req.get('host')}`
		const url = `/api/${options.apiModel}`
		const opt = Object.assign({}, options, { baseUrl: baseUrl, url: url }, req.params)
		//console.log('req host', baseUrl, url)

		vm(opt)
			.then(data => render(
				m(ListByName, {
					data: data,
					model: opt.apiModel,
					baseRoute: opt.baseRoute
				})
			))
		//.then(x => console.log('vm list rendered', x) || x)
			.then(rendered => template.replace(
						'<div id="component"></div>',
						rendered
					)
				
			)
			.then(html => {
				res.locals.html = html
				next()
			})

			.catch(err => {
				console.error(err,
					'List gen error baseUrl, url',
					baseUrl, 
					url
				)
			})
	}

module.exports = List
