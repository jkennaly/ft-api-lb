// server/boot/block-cache.js

module.exports = function(app, callback) {
	app.models.Message.updatePairs()
	callback()
}
