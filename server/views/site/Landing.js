// server/views/site/Landing.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

var m = require('mithril')
var render = require('mithril-node-render')


var fs = require('fs')
const template = fs.readFileSync('./server/views/site/shell.html', 'utf8')
const landing = fs.readFileSync('./server/views/site/landing.frag.html', 'utf8')

const Landing = options =>
	function(req, res, next) {
		console.log('landing')
		
		const html = template.replace(
						'<div id="component"></div>',
						landing
					)
		res.locals.html = html
		next()
		
	}

module.exports = Landing
