// server/boot/core-data.js

module.exports = function(app, callback) {
	app.models.Core.allData(callback)
}
