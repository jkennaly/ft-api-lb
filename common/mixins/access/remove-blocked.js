// common/mixins/access/remove-blocked.js

const _ = require("lodash")

var blockPairs = []

module.exports = function(Message) {
	Message.updatePairs = function() {
		return (
			Message.app.models.Interaction.find({
				where: { type: 10, subjectType: 1, deleted: false }
			})
				//.then(blocks => console.log("Message updatePairs", blocks) || blocks)
				.then(blocks => (blockPairs = blocks.map(b => [b.user, b.subject])))
				.catch(console.error)
		)
	}

	Message.observe("access", function event(ctx, next) {
		const authorId =
			ctx.options.req && ctx.options.req.user && ctx.options.req.user.ftUserId
		Message.updatePairs()
			.then(blockPairs => {
				const blockIds = blockPairs
					.filter(p => p.includes(authorId))
					.map(([id1, id2]) => (authorId === id1 ? id2 : id1))
				//console.log("remove-blocked.js", authorId, blockIds)
				if (!blockIds.length) return next()
				const whereSup = { and: [{ fromuser: { nin: blockIds } }] }

				ctx.query.where = ctx.query.where ? ctx.query.where : {}
				const currentKeys = _.keys(ctx.query.where)

				if (!currentKeys) {
					ctx.query.where = whereSup
				} else {
					ctx.query.where = { and: [whereSup, ctx.query.where] }
				}
				next()
			})
			.catch(err => {
				console.error(err)
				return next()
			})
	})
}
