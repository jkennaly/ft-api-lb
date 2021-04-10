// common/mixins/stats/artist-stats.js

const _ = require('lodash')

module.exports = function(Artist) {
	Artist.stats = function(req, id, cb) {
		const p = Promise.all([
			//artist average rating
			//artist rating count
			Artist.app.models.Message.find({
				where: {
					and: [{ subjectType: 2 }, { subject: id }, { messageType: 2 }]
				}
			}),
			//set average rating
			//set checkins
			Artist.app.models.Set.find({
				where: { band: id }
			}).then(sets =>
				Artist.app.models.Message.find({
					where: {
						and: [
							{ subjectType: 3 },
							{ subject: { inq: sets.map(x => x.id) } },
							{ or: [{ messageType: 2 }, { messageType: 3 }] }
						]
					}
				})
			)
		])
		//.then(x => console.log('stat Promise: artistRatings, setCheckRates', x) || x)
		.then(([artistRatings, setCheckRates]) => {
			const rates = setCheckRates
					.filter(m => m.messageType === 2)
			const data = {
				artistId: id,
				averageRating: artistRatings.reduce(
					(avg, rate, i, ar) => avg + parseInt(rate.content, 10) / ar.length,
					0
				),
				setRatingCount: rates.length,
				artistRatingCount: artistRatings.length,
				setRating: rates
					.reduce((avg, rate, i, ar) => avg + parseInt(rate.content, 10) / ar.length, 0),
				checkinCount: setCheckRates.filter(m => m.messageType === 3).length
			}
			return data
		})
		.then(stat => {
			if(cb) return cb(undefined, stat)
			return stat
		})
		.catch(err => {
			if(cb) return cb(err)
			throw err
		})
		if(!cb) return p
	}

	Artist.remoteMethod('stats', {
		accepts: [
			{ arg: 'req', type: 'object', http: { source: 'req' } },
			{ arg: 'id', type: 'number', required: true }
		],
		http: { path: '/stats/:id', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})
}
