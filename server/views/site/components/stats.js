// server/views/site/stats.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
const m = require('mithril')

const stats = {
	view: ({ attrs }) =>
		m.trust(`<div>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <span class="text-sm font-medium text-gray-500 truncate">
        Avg. Rating
      </span >
      <div id="subject-rating"></div>
    </div>

    <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <span class="text-sm font-medium text-gray-500 truncate">
        Avg. Set Rating
      </span >
      <div id="set-rating"></div>
    </div>

    <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <span class="text-sm font-medium text-gray-500 truncate">
        Total Set Checkins
      </span >
      <div class="text-center">
      <div id="set-checkins"></div>
    </div>
    </div>
  </dl>
</div>`)
}

module.exports = stats
