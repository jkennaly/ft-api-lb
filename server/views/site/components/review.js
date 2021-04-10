// server/views/site/components/review.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
const m = require('mithril')

const _ = require('lodash')
var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Rating = require('./rating')
const appUrl = require('../../../../bin/common/appUrl')
const timeSince = {}

const stats = {
	view: ({ attrs }) => m(
		'li',
		m('div.flex.space-x-3', [
			m(
				'div.flex-shrink-0',
				m(
					`img.h-10.w-10.rounded-full[src="${
						attrs.review.reviewer.picture
					}"][alt=""]`
				),
				m('.w-10',
				m(Rating, {rating: parseInt(attrs.review.rating.content , 10)})
				)
			),
			m('div', [
				m(
					'div.text-sm',
					m(
						'a.font-medium.text-gray-900[href="#"]',
						attrs.review.reviewer.username
					)
				),
				m(
					'div.mt-1.text-sm.text-gray-700',
					m(
						'p',
						attrs.review.comment.content
					)
				),
				m('div.mt-2.text-sm.space-x-2', [
					m('span.text-gray-500.font-medium', dayjs(attrs.review.comment.timestamp).fromNow(true)),
					m('span.text-gray-500.font-medium', '·'), m('a', {href: appUrl(attrs.review.comment)}, 
					m('button.text-gray-900.font-medium[type="button"]', 'Reply'))
				])
			])
		])
	)
}
module.exports = stats
