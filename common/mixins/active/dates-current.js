// common/mixins/active/dates-current.js

const START_OFFSET = 2
const END_OFFSET = 3

const _ = require('lodash')

module.exports = function(Model) {
	Model.allActiveIds = function(cb) {
		//a date is active if its baseDate is between:
			//now - START_OFFSET
			//now + END_OFFSET
		var startDate = new Date()
		startDate.setDate(startDate.getDate() - START_OFFSET)
		const p = Model.find({where: { and: [
			{baseDate: {gt: startDate}},
			{deleted: false}
		]}})
			.then(currentAndFutureDates => {
				//find max offset of a day for each date
				Promise.all([ currentAndFutureDates, ...currentAndFutureDates.map(d => {
					return Model.app.models.Day.find({
						where: {
							date: d.id
						},
						order: 'daysOffset DESC',
						limit: 1
					})
				})])
			})
			.then(([res, days]) => res.filter((d, i) => {
				const addDate = d.baseDate.getDate() + END_OFFSET + days[i].daysOffset
				const endDate = (new Date()).baseDate.setDate(addDate)
				return new Date() - endDate < 0

			}))
			.then(res => cb ? cb(undefined, res) : res)
			.catch(err => cb ? cb(err) : console.log('allActiveIds error:', err))
		return p
		
	}
	Model.isActive = function(id, cb) {
		//a date is active if its baseDate is between:
			//now - START_OFFSET
			//now + END_OFFSET
		var startDate = new Date()
		startDate.setDate(startDate.getDate() - START_OFFSET)
		var endDate = new Date()
		endDate.setDate(endDate.getDate() + END_OFFSET)
		return Date.allActiveIds()
			.then(res => cb(undefined, res.includes(id)))
			.catch(cb)
		
		
	}

	Model.remoteMethod('isActive', {
	    accepts: [{arg: 'id', type: 'number', required: true}],
	    http: {path: '/active/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'boolean'}
	})

	Model.remoteMethod('allActiveIds', {
	    http: {path: '/active', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})

}
