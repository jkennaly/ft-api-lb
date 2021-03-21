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
		const p = Model.app.models.Date.find({
					 where: { and: [
						{festival: id},
						{deleted: false}
					]}
				})
					.then(dates => dates.sort((a, b) => a.basedate.valueOf() - b.basedate.valueOf())[0])
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

			
			.catch(err => {
				console.log('epochStart Fests error:', err)
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
		const p = Model.app.models.Date.find({
					 where: { and: [
						{festival: id},
						{deleted: false}
					]}
				})
					.then(dates => dates.sort((a, b) => b.basedate.valueOf() - a.basedate.valueOf())[0])
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

			
			.catch(err => {
				console.log('epochEnd Fests error:', err)
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
