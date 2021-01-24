// bin/tokens/roles.js

//generate the roles claime based on the access field value

module.exports = function(access) {
	const claimName = `https://festigram/roles`
	const claimHolder = {}
	claimHolder[claimName] = JSON.parse(access)

	return claimHolder
}
