// bin/tokens/name.js

//generate the name claime based on the access field value

module.exports = function(name, claimName='name') {
	const claimHolder = {}
	claimHolder[claimName] = name

	return claimHolder
}
