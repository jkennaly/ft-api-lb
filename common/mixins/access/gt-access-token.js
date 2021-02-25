// common/mixins/access/gt-access-token.js

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5
const FULL_CAP = process.env.FULL_CAP || 10
const _ = require('lodash')

module.exports = function(Profile) {
	Profile.gtToken = function(req, cb) {
		//if the user has full access, the cost is 0
		//get full access cost
		//console.log('Profile.cost', cb, arguments)
    	const userId = req && req.user && req.user.ftUserId

		createJwt()
			//.then(x => console.log('create jwt result', x) || x)
			.then(result => {
				cb(undefined, result)
			})
			.catch(cb)

	}

	Profile.remoteMethod('gtToken', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}}
		],
	    http: {path: '/gametimeToken', verb: 'get'},
	    returns: {arg: 'token', type: 'object'}
	})
}