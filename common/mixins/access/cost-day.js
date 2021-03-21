// common/mixins/access/cost-day.js
const _ = require('lodash')

module.exports = function(Day) {
	Day.cost = function(req, id, cb) {
		//if the user has access, the cost is 0
		//get date cost
		//get festival cost
		//get full access cost
		//const t0 = Date.now()
		////console.log("cost-day", userId)
		const userId = req && req.user && req.user.ftUserId
		if(!userId) return cb(undefined, {
			dayId: id,
			day: 1,
			date: 3,
			festival: 5,
			full: 10
		})
		Day.dayAccess(req, id, (err, hasDayAccess) => {
		//const t1 = Date.now()
		//console.log('t1', t1 - t0)

			if (err) {
				//console.log('fulfillBucks save error', err)
				return cb(err)
			}
			//user has access
			//console.log("cost-day date-access", hasAccess);
			Day.find({ where: { id: id } }, (err, days) => {
		//const t2 = Date.now()
		//console.log('t2', t2 - t1)
				if(!days.length) return cb({
                        message: "Unknown Day",
                        status: 404,
                statusCode: 404
                    })
				const dateId = days[0].date
				//console.log("cost-day day-find dateId", dateId, days[0])
				Day.app.models.Date.dateAccess(req, dateId, (err, hasAccess) => {
		//const t3 = Date.now()
		//console.log('t3', t3 - t2)
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
		//const t4 = Date.now()
		//console.log('t4', t4 - t3)
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
		//const tf = Date.now()
		//console.log('tf', tf - t4)
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
