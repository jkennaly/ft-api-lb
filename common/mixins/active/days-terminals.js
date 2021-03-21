// common/mixins/active/days-terminals.js

const _ = require('lodash')

const START_OFFSET = 2
const END_OFFSET = 3

module.exports = function(Model) {
	var starts = {}
	var ends = {}
	Model.epochStart = function(id, cb) {
		//a date is active if its basedate is between:
			//now - START_OFFSET
			//now + END_OFFSET
		if(!_.isInteger(id)) return cb({
            message: "MalformedRequestError: Invalid Id",
            status: 404,
    		statusCode: 404
        })
		const cacheKey = `[${id}]`
		const cached = _.get(starts, cacheKey)
		if(cached) return cb(undefined, cached)
		const p = Model.find({where: { and: [
			{id: id},
			{deleted: false}
		]}})
			.then(days => {
				const day = days[0]
				if(!day) return cb({
                    message: `Unknown Day Start Id ${id}`,
                    status: 404,
                	statusCode: 404
                })
				return Model.app.models.Date.find({where: { and: [
					{id: day.date},
					{deleted: false}
				]}})
					.then(dates => dates[0])
					.then(date => {
						if(!date || !date.basedate || !date.basedate.getDate) throw new Error(`date id ${id}: Bad date ${JSON.stringify(date)}`)
						return Model.app.models.Date.epochStart(date.id, (err, res) => {
							if(err) return cb({
			                    message: `Unknown Date.epochStart Id ${date.id}`,
			                    status: 404,
			                	statusCode: 404
			                })
							_.set(starts, `[${id}]`, res)
							cb(undefined, res)
						})
					})

			})
			.catch(err => {
				console.log('epochStart Days error:', err)
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
		const cacheKey = `[${id}]`
		const cached = _.get(ends, cacheKey)
		if(cached) return cb(undefined, cached)
		const p = Model.find({where: { and: [
			{id: id},
			{deleted: false}
		]}})
			.then(days => {
				const day = days[0]
				if(!day) return cb({
                    message: `Unknown Day End Id ${id}`,
                    status: 404,
                	statusCode: 404
                })
				return Model.app.models.Date.find({where: { and: [
					{id: day.date},
					{deleted: false}
				]}})
					.then(dates => dates[0])
					.then(date => {
						if(!date || !date.basedate || !date.basedate.getDate) throw new Error(`date id ${id}: Bad date ${JSON.stringify(date)}`)
						return Model.app.models.Date.epochEnd(date.id, (err, res) => {
							if(err) return cb({
			                    message: `Unknown Date.epochEnd Id ${date.id}`,
			                    status: 404,
			                	statusCode: 404
			                })
							_.set(ends, `[${id}]`, res)
							cb(undefined, res)
						})
					})

			})
			.catch(err => {
				console.log('epochEnd Days error:', err)
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
