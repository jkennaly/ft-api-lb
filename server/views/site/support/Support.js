// server/views/site/Landing.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

var m = require('mithril')
var render = require('mithril-node-render')


var fs = require('fs')
const template = fs.readFileSync('./server/views/site/shell.html', 'utf8')
const support = fs.readFileSync('./server/views/site/support/support.frag.html', 'utf8')

const page = options =>
	function(req, res, next) {
		//console.log('support')
		
		const html = template.replace(
						'<div id="component"></div>',
						support
					)
		res.locals.html = html
		next()
		
	}

module.exports = page
