// common/mixins/access/cost-fest.js
const _ = require('lodash')

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5
const FULL_CAP = process.env.FULL_CAP || 10

module.exports = function(Fest) {
	Fest.cost = function(req, id, cb) {
		//if the user has access, the cost is 0
		//count bucks towards this fest
		//get full access cost
		
		const userId = req && req.user && req.user.ftUserId
		//console.log('Fest.cost id', id, userId)
		if(!userId) return cb(undefined, {
			festivalId: id,
			festival: 5,
			full: 10
		})
		//console.log('costFest festAccess')
		Fest.festAccess(req, id, (err, hasAccess) => {

	      if(err) {
	        console.trace('costFest festAccess error', err)
	        return cb(err)
	      }
	      //user has access
			const costObject = {
				festivalId: id,
				festival: 0
			}
			if(hasAccess) return cb(undefined, costObject)
		//console.log('bucksTowardsFest')
			Fest.bucksTowardsFest(userId, id, (err, bucks) => {

		    	if(err) {
	        console.trace('costFest festAccess bucksTowardsFest error', err)
		    	  return cb(err)
		    	}
		      
		//console.log('bucksTowardsFull')
				Fest.app.models.Profile.bucksTowardsFull(userId, (err, bucksFull) => {

				    if(err) {
	        console.trace('costFest festAccess bucksTowardsFull error', err)
				      return cb(err)
				    }
				      
					const costObject = {
						festivalId: id,
						festival: FEST_CAP - (_.isNumber(bucks) ? bucks : 0),
						full: FULL_CAP - (_.isNumber(bucksFull) ? bucksFull : 0),

					}
				    cb(undefined, costObject)
					})
			})
		})
		
	}

	Fest.remoteMethod('cost', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}},
		    {arg: 'id', type: 'number', required: true}
		],
	    http: {path: '/cost/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})

	Fest.remoteMethod('festAccess', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}},
		    {arg: 'id', type: 'number', required: true}
	    ],
	    http: {path: '/access/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})
}