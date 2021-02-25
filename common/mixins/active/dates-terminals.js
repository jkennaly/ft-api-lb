// common/mixins/active/dates-terminals.js

const _ = require('lodash')

const START_OFFSET = 2
const END_OFFSET = 3

module.exports = function(Model) {
	Model.epochStart = function(id, cb) {
		//a date is active if its basedate is between:
			//now - START_OFFSET
			//now + END_OFFSET
		if(!_.isInteger(id)) return cb({
            message: "MalformedRequestError: Invalid Id",
            status: 404,
    		statusCode: 404
        })
		const p = Model.find({where: { and: [
			{id: id},
			{deleted: false}
		]}})
			.then(dates => {
				const date = dates[0]
				if(!date) return cb({
                        message: `Unknown Id ${id}`,
                        status: 404,
                statusCode: 404
                    })
				var startDate = date.basedate
				//console.log('Model.epochStart date', date)
				startDate.setDate(startDate.getDate() - START_OFFSET)
				return startDate

			})
			.then(res => cb(undefined, Math.floor(res.valueOf() / 1000)))
			.catch(err => {
				console.log('epochEnd error:', err)
				cb(err)
			})
			

		//return p
	}
		
	Model.epochEnd = function(id, cb) {
		//a date is active if its basedate is between:
			//now - START_OFFSET
			//now + END_OFFSET
		if(!_.isInteger(id)) return cb({
            message: "MalformedRequestError: Invalid Id",
            status: 404,
    		statusCode: 404
        })
		const p = Model.find({where: { and: [
			{id: id},
			{deleted: false}
		]}})
			.then(dates => dates[0])
			.then(date => Promise.all([date, !date ? [] : Model.app.models.Day.find({
				where: { and: [
					{date: date.id},
					{deleted: false}
				]},
				order: 'daysOffset DESC',
				limit: 1
			})]))
			.then(([date, [lastDay, ...rest]]) => {
				if(!date || !date.basedate || !date.basedate.getDate) throw new Error(`date id ${id}: Bad date ${JSON.stringify(date)}`)
				if(!lastDay || !lastDay.daysOffset) throw new Error(`date id ${id}: Bad lastDay ${JSON.stringify(lastDay)}`)
				const addDate = date.basedate.valueOf() + (END_OFFSET + lastDay.daysOffset) * 24 *3600 * 1000
				const endDate = new Date(addDate)
				//console.log('dates', addDate, endDate.toLocaleString())
				return Math.floor(endDate.valueOf() / 1000)
			})
			.then(res => cb(undefined, res))
			.catch(err => {
				//console.log('epochEnd error:', err)
				cb(err)
			})
		//return p
	}

	Model.remoteMethod('epochStart', {
	    accepts: [{arg: 'id', type: 'number', required: true}],
	    http: {path: '/start/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'number'}
	})

	Model.remoteMethod('epochEnd', {
	    accepts: [{arg: 'id', type: 'number', required: true}],
	    http: {path: '/end/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'number'}
	})

}
