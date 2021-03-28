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
		//console.log('costFest festivalAccess')
		Fest.festivalAccess(req, id, (err, hasAccess) => {

	      if(err) {
	        console.trace('costFest festivalAccess error', err)
	        return cb(err)
	      }
	      //user has access
			const costObject = {
				festivalId: id,
				festival: 0
			}
		//console.log('bucksTowardsFest festivalAccess, ', hasAccess, costObject)
			if(hasAccess) return cb(undefined, costObject)
			Fest.bucksTowardsFest(userId, id, (err, bucks) => {

		    	if(err) {
	        console.trace('costFest festivalAccess bucksTowardsFest error', err)
		    	  return cb(err)
		    	}
		      
		//console.log('costFest bucksTowardsFest', bucks)
				Fest.app.models.Profile.bucksTowardsFull(userId, (err, bucksFull) => {

				    if(err) {
	        console.trace('costFest festivalAccess bucksTowardsFull error', err)
				      return cb(err)
				    }
				      
					const costObject = {
						festivalId: id,
						festival: FEST_CAP - (_.isNumber(bucks) ? bucks : 0),
						full: FULL_CAP - (_.isNumber(bucksFull) ? bucksFull : 0),

					}
		//console.log('costFest bucksTowardsFull', bucksFull, costObject)
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

	Fest.remoteMethod('festivalAccess', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}},
		    {arg: 'id', type: 'number', required: true}
	    ],
	    http: {path: '/access/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})
}