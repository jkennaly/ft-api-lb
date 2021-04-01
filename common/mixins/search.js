// common/mixins/access/buy.js

const _ = require("lodash")

var ledgerCache = {}

module.exports = function nameSearch(Model, options) {
	Model.searchName = function(pattern, cb) {
		const nameField = options && options.altName ? options.altName : "name"
		const nameObject = { like: `%${pattern}%` }
		let whereObject = {}
		whereObject[nameField] = nameObject
		let fieldObject = { id: true }
		fieldObject[nameField] = true
		Model.find(
			{
				where: whereObject,
				limit: 5,
				fields: fieldObject,
			},
			cb
		)
	}

	Model.remoteMethod("searchName", {
		accepts: [{ arg: "pattern", type: "String", required: true }],
		http: { path: "/search/:pattern", verb: "get" },
		returns: { arg: "data", type: "array" },
	})
}
