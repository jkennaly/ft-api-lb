// common/mixins/access/cost-day.js
const _ = require('lodash')

module.exports = function(Day) {
	Day.cost = function(req, id, cb) {
		//if the user has access, the cost is 0
		//get date cost
		//get festival cost
		//get full access cost

		const userId = req && req.user && req.user.ftUserId
		//console.log("cost-day", userId)
		if(!userId) return cb(undefined, {
			dayId: id,
			day: 1,
			date: 3,
			festival: 5,
			full: 10
		})
		Day.dayAccess(req, id, (err, hasDayAccess) => {
			if (err) {
				//console.log('fulfillBucks save error', err)
				return cb(err)
			}
			//user has access
			//console.log("cost-day date-access", hasAccess);
			Day.find({ where: { id: id } }, (err, days) => {
				if(!days.length) return cb({
                        message: "Unknown Day",
                        status: 404,
                statusCode: 404
                    })
				const dateId = days[0].date
				//console.log("cost-day day-find dateId", dateId, days[0])
				Day.app.models.Date.dateAccess(req, dateId, (err, hasAccess) => {
					if (err) {
						//console.log('fulfillBucks save error', err)
						return cb(err)
					}
					//user has access
					//console.log("cost-day date-access", hasAccess);
					const costObject = {
						dayId: id,
						day: 0
					}
					if (hasAccess) return cb(undefined, costObject)

					Day.app.models.Date.cost(req, dateId, (err, dateCost) => {
						if (err) {
							//console.log('fulfillBucks save error', err)
							return cb(err)
						}
						//console.log("cost-day dateCost", dateCost);
						const costObject = Object.assign(
							{
								dayId: id,
								day: hasDayAccess ? 0 : 1
							},
							_.pick(dateCost, _.keys(dateCost).filter(k => !/Id$/.test(k)))
						)
						cb(undefined, costObject)
					})
				})
			})
		})
	}

	Day.remoteMethod('cost', {
		accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}},
			{ arg: 'id', type: 'number', required: true }],
		http: { path: '/cost/:id', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})

	Day.remoteMethod('dayAccess', {
		accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}},
			{ arg: 'id', type: 'number', required: true }],
		http: { path: '/access/:id', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})
}
