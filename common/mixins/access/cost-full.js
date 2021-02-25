// common/mixins/access/cost-full.js

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5
const FULL_CAP = process.env.FULL_CAP || 10
const _ = require('lodash')

module.exports = function(Profile) {
	Profile.cost = function(req, cb) {
		//if the user has full access, the cost is 0
		//get full access cost
		const userId = req && req.user && req.user.ftUserId
		//console.log('Profile.cost', userId)
		if(!userId) return cb(undefined, {
			full: 10
		})
		Profile.fullAccess(req, (err, result) => {
			if (err) {
				console.trace('costFull fullAccess error', err)
				return cb(err)
			}
			//user has full access
			const costObject = {
				full: 0
			}
		//console.log('Profile.cost fullAccess', result)
			if (result) return cb(undefined, costObject)
			Profile.bucksTowardsFull(userId, (err, bucks) => {
				if (err) {
					console.trace('costFull bucksTowardsFull error', err)
					return cb(err)
				}

		//console.log('Profile.cost bucksTowardsFull', bucks)
				const costObject = {
					full: FULL_CAP - (_.isNumber(bucks) ? bucks : 0)
				}
				cb(undefined, costObject)
			})
		})
	}

	Profile.remoteMethod('cost', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}}
		],
		http: { path: '/cost/full', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})

	Profile.remoteMethod('fullAccess', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}}
		],
		http: { path: '/access', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})

}
