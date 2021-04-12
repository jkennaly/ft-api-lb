// server/views/site/components/yearBunch.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
const m = require('mithril')
const _ = require('lodash')

const Review = require('./review')
const timeSince = {}

const stats = {
	view: ({ attrs }) =>
		m(
			'section[aria-label="other years"]',
			m('div.bg-white.shadow.sm:rounded-lg.sm:overflow-hidden', [
				attrs.festivals && attrs.festivals.map(f => m('a', {href: `/site/festivals/${attrs.series.name}/${f.year}`},
					m(
						'button.inline-flex.items-center.px-3.py-1.5.border.border-transparent.text-xs.font-medium.rounded-full.shadow-sm.text-white.bg-indigo-600.hover:bg-indigo-700.focus:outline-none.focus:ring-2.focus:ring-offset-2.focus:ring-indigo-500[type="button"]',
						f.year
					)
				))
				
			])
		)
}

module.exports = stats
