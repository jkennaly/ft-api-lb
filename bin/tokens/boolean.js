// bin/tokens/boolean.js

//generate the claime based on the access field value

module.exports = function(value, claimName='bool') {
	const claimHolder = {}
	claimHolder[claimName] = Boolean(value)

	return claimHolder
}
