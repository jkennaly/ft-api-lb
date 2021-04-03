// common/mixins/fromuserstamp.js

"use strict"

const _ = require("lodash")

module.exports = function fromuserstamp(Model, options) {
	Model.observe("before save", function event(ctx, next) {
		// get current user ID
		const authorId =
			ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId
		const keepId =
			!authorId &&
			((ctx.instance && ctx.instance.fromuser && ctx.instance.id) ||
				(ctx.data && ctx.data.fromuser && ctx.data.id))
		if (keepId) return next()
		//console.log('userstamp mixin user ' + authorId)
		if (ctx.instance) {
			//console.log('userstamp mixin ctx.instance ')
			ctx.instance.fromuser = authorId
		} else if (ctx.data) {
			//console.log('userstamp mixin ctx.data ')
			ctx.data.fromuser = authorId
		}

		// next callback in the stack.
		next()
	})
}
