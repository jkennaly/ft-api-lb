// common/mixins/update-block-cache.js

module.exports = function(Interaction, options) {
	Interaction.observe("after save", function event(ctx, next) {
		const multiUpdate = !ctx.instance
		const blockCacheUpdate = multiUpdate || ctx.instance.type === 10
		if (blockCacheUpdate) Interaction.app.models.Message.updatePairs()
		next()
	})
}
