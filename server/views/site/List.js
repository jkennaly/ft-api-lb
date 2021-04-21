// server/views/site/List.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

var m = require('mithril')
var render = require('mithril-node-render')
const _ = require('lodash')


const ListByName = require('./ListByName')
const Pagination = require('./components/pagination')
const vm = require('../../vm/vm_list')

var fs = require('fs')
const template = fs.readFileSync('./server/views/site/shell.html', 'utf8')

const List = options =>
	function(req, res, next) {
		const baseUrl = `${req.protocol}://${req.get('host')}`
		const url = `/api/${options.apiModel}`
		const opt = Object.assign({}, options, { baseUrl: baseUrl, url: url }, req.params)
		const page = _.get(req, 'query.page', '0')
		const pageNo = parseInt(page, 10)
		const path = options.path ? options.path : baseUrl + `/site/?page=${pageNo}`

		vm(opt)
			.then(fullData => {
				const allData = !pageNo || fullData.length < 200
				const startIndex = allData ? 0 : (pageNo - 1) * 100
				const end = allData ? undefined : startIndex + 100
				const pageData = fullData.slice(startIndex, end)
				const pageCount = Math.ceil(fullData.length / 100)
				const totalCount = fullData.length
				//console.log('req lengths', startIndex, end, fullData.length, pageData.length)
				return [pageData, allData, pageNo, pageCount, totalCount]
			})
			.then(([data, allData, pageNo, pageCount, totalCount]) => Promise.all([
							render(
								m(ListByName, {
									data: data,
									model: opt.apiModel,
									baseRoute: opt.baseRoute
								})
							), 
							allData ? `` : render(
								m(Pagination, {pageNo, pageCount, totalCount, path})
							)
						]))
		//.then(x => console.log('vm list rendered', x) || x)
			.then(([rendered, pagination]) => template.replace(
						'<div id="component"></div>',
						rendered
					).replace(
						'<div id="pagination"></div>',
						pagination
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
				next(err)
			})
	}

module.exports = List
