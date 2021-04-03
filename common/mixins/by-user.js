// common/mixins/by-user.js

"use strict"

const _ = require("lodash")

module.exports = function byUser(Model, options) {
	Model.observe("access", function event(ctx, next) {
		// get current user ID
		const authorId =
			ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId

		//console.log("by-user mixin user " + authorId)
		//console.log("by-user mixin query", ctx.query)

		const byFilter = { user: authorId }
		const targetFilter = options.targetOk
			? {
					and: [
						{ type: { neq: 10 } },
						{ subjectType: 1 },
						{ subject: authorId },
						{ deleted: false }
					]
			  }
			: {}
		const newFilter = options.targetOk ? { or: [byFilter, targetFilter] } : byFilter

		ctx.query.where = ctx.query.where ? ctx.query.where : {}
		const currentKeys = _.keys(ctx.query.where)

		if (!currentKeys) {
			ctx.query.where = newFilter
		} else {
			const currentAnd =
				currentKeys.includes("and") && _.isArray(ctx.query.where.and)
			if (currentAnd) ctx.query.where.and.push(newFilter)
			else ctx.query.where = { and: [newFilter, ctx.query.where] }
		}

		// next callback in the stack.
		next()
	})
}
