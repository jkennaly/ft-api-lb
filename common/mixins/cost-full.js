// common/mixins/cost-full.js

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5
const FULL_CAP = process.env.FULL_CAP || 10
const _ = require('lodash')

module.exports = function(Profile) {
	Profile.cost = function(cb) {
		//if the user has full access, the cost is 0
		//get full access cost
		//console.log('Profile.cost', cb, arguments)
    	const userId = Profile.app.get('ftUserId')
		Profile.fullAccess(userId, (err, result) => {

	      if(err) {
	        //console.log('fulfillBucks save error', err)
	        return cb(err)
	      }
	      //user has full access
			const costObject = {
				full: 0
			}
	      if(result) return cb(undefined, costObject)
	      Profile.bucksTowardsFull(userId, (err, bucks) => {

	      if(err) {
	        //console.log('fulfillBucks save error', err)
	        return cb(err)
	      }
	      
			const costObject = {
				full: FULL_CAP - (_.isNumber(bucks) ? bucks : 0)
			}
	      cb(undefined, costObject)
		})
		})
		

	}

	Profile.remoteMethod('cost', {
	    http: {path: '/cost/full', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})

	Profile.remoteMethod('fullAccess', {
	    http: {path: '/access', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})
}