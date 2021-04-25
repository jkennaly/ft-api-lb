// server/views/site/support/Support.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

var m = require('mithril')
var render = require('mithril-node-render')


var fs = require('fs')
const template = fs.readFileSync('./server/views/site/shell.html', 'utf8')
const support = fs.readFileSync('./server/views/site/support/support.frag.html', 'utf8')
const request = fs.readFileSync('./server/views/site/support/request.frag.html', 'utf8')
const problem = fs.readFileSync('./server/views/site/support/problem.frag.html', 'utf8')
const other = fs.readFileSync('./server/views/site/support/other.frag.html', 'utf8')

const page = options =>
	function(req, res, next) {
		//console.log('support')
		
		const html = template.replace(
						'<div id="component"></div>',
						support
					).replace(
						'<div id="request"></div>',
						request
					).replace(
						'<div id="problem"></div>',
						problem
					).replace(
						'<div id="other"></div>',
						other
					)
		res.locals.html = html
		next()
		
	}

module.exports = page
