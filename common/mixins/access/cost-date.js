// common/mixins/access/cost-date.js
const _ = require('lodash')

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5
const FULL_CAP = process.env.FULL_CAP || 10

module.exports = function(Date) {
	Date.cost = function(req, id, cb) {
		//if the user has access, the cost is 0
		//if the user has a free date available, the cost is 0
		//count bucks towards this date
		//get festival cost
		//get full access cost
		if(!id) return cb(undefined, {full: 10})
		const userId = req && req.user && req.user.ftUserId
		//console.log("cost-date", id)
		if(!userId) return cb(undefined, {
			dateId: id,
			date: 3,
			festival: 5,
			full: 10
		})

		Date.dateAccess(req, id, (err, hasAccess) => {

	      if(err) {
	        console.log('Date.cost dateAccess error', err)
	        return cb(err)
	      }
		//console.log("cost-date dateAccess hasAccess", hasAccess)
	      //user has access
			const costObject = {
				dateId: id,
				date: 0
			}
			if(hasAccess) return cb(undefined, costObject)
			Date.find({where: {id: id}}, (err, dates) => {
				const date = JSON.parse(JSON.stringify(dates[0]))
		//console.log("cost-date dateAccess date", date)
				Date.app.models.Festival.cost(req, date.festival, (err, festCost) => {

			    	if(err) {
			    	  //console.log('fulfillBucks save error', err)
			    	  return cb(err)
			    	}
		//console.log("cost-date dateAccess festCost", festCost)
					Date.bucksTowardsDate(userId, id, (err, bucks) => {

					    if(err) {
					      //console.log('fulfillBucks save error', err)
					      return cb(err)
					    }
					      
		//console.log("cost-date dateAccess bucksTowardsDate", bucks)
						const costObject = Object.assign({
							dateId: id,
							date: DATE_CAP - (_.isNumber(bucks) ? bucks : 0)

						}, _.pick(festCost, _.keys(festCost).filter(k => !/Id$/.test(k))))
					    cb(undefined, costObject)
					})
				})
			})
		})
		
	}

	Date.remoteMethod('cost', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}},
			{arg: 'id', type: 'number', required: true}
		],
	    http: {path: '/cost/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})

	Date.remoteMethod('dateAccess', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}},
			{arg: 'id', type: 'number', required: true}
		],
	    http: {path: '/access/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})
}