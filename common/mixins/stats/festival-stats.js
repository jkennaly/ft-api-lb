// common/mixins/stats/artist-stats.js

const _ = require('lodash')

//artistRating

// -> past
//setRating
//setCheckins

// -> unended
//most liked
//most hated

module.exports = function(Festival) {
	//find all sets
	Festival.stats = function(req, id, cb) {
		const p = Festival.subEventsPromise(id)
			.then(({ dates, days, sets }) => {
				const artistIds = _.uniq(sets.map(s => s.band))
				const setIds = sets.map(s => s.id)
				return Festival.app.models.Message.find({
					where: {
						and: [
							{
								or: [
									//artist rating
									{
										and: [
											{ messageType: 2 },
											{ subjectType: 2 },
											{ subject: { inq: artistIds } }
										]
									},
									//set rating/checkin
									{
										and: [
											{
												or: [
													{ messageType: 2 },
													{ messageType: 3 }
												]
											},
											{ subjectType: 3 },
											{ subject: { inq: setIds } }
										]
									}
								]
							},
							{ deleted: false }
						]
					}
				}).then(mixedMessages => {
					const msg = mixedMessages.reduce(
						(sorted, m) => {
							if (m.messageType === 2 && m.subjectType === 2)
								sorted.artistRating.push(m)
							if (m.messageType === 2 && m.subjectType === 3)
								sorted.setRating.push(m)
							if (m.messageType === 3 && m.subjectType === 3)
								sorted.setCheckin.push(m)
							return sorted
						},
						{ artistRating: [], setRating: [], setCheckin: [] }
					)
					const artistAvg = msg.artistRating.reduce(
						(avg, m, i, ar) => avg + parseInt(m.content, 10) / ar.length,
						0
					)
					const artistRateCount = msg.artistRating.length
					const setAvg = msg.setRating.reduce(
						(avg, m, i, ar) => avg + parseInt(m.content, 10) / ar.length,
						0
					)
					const setRateCount = msg.setRating.length
					const checkCount = msg.setCheckin.length
					let count = {}
					const artistScores = msg.artistRating.reduce((points, m, i, ar) => {
						points[m.subject] = points[m.subject] ? points[m.subject] : 0
						points[m.subject] += parseInt(m.content, 10)
						return points
					}, {})
					const sortedScores = _.toPairs(artistScores).sort((a, b) => b[1] - a[1])
					const lovedArtistId = sortedScores.length && sortedScores[0].map(x => parseInt(x, 10))
					const lovedScoreCount = msg.artistRating
						.filter(m => m.messageType === 2 && m.subjectType === 2 && m.subject === lovedArtistId[0])
						.length
					lovedArtistId[1] = lovedArtistId[1] / lovedScoreCount
					const hatedArtistId =
						sortedScores.length && sortedScores[sortedScores.length - 1].map(x => parseInt(x, 10))
					const hatedScoreCount = msg.artistRating
						.filter(m => m.messageType === 2 && m.subjectType === 2 && m.subject === hatedArtistId[0])
						.length
					hatedArtistId[1] = hatedArtistId[1] / hatedScoreCount
					
					return {
						artistRating: artistAvg,
						artistRatingCount: artistRateCount,
						setRating: setAvg,
						setRatingCount: setRateCount,
						setCheckin: checkCount,
						lovedArtistId,
						hatedArtistId
					}
				})
			})
			.then(stat => {
				//console.log('festival-stats.js return', stat)
				if (cb) return cb(undefined, stat)
				return stat
			})
			.catch(err => {
				console.log('festival-stats.js error caught')
				if (cb) return cb(err)
				throw err
			})
		if(!cb) return p
	}

	Festival.remoteMethod('stats', {
		accepts: [
			{ arg: 'req', type: 'object', http: { source: 'req' } },
			{ arg: 'id', type: 'number', required: true }
		],
		http: { path: '/stats/:id', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})
}
