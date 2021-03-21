// common/mixins/active/sets-terminals.js

const _ = require('lodash')

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
		const p = Model.find({where: { and: [
			{id: id},
			{deleted: false}
		]}})
			.then(sets => {
				const set = sets[0]
				if(!set) return cb({
                    message: `Unknown Set Start Id ${id}`,
                    status: 404,
                	statusCode: 404
                })
				return Model.app.models.Day.find({where: { and: [
					{id: set.date},
					{deleted: false}
				]}})
					.then(days => days[0])
					.then(day => {
						if(!day) throw new Error(`day id ${id}: Bad day ${JSON.stringify(day)}`)
						return Model.app.models.Day.epochStart(day.id, (err, res) => {
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
				console.log('epochStart Sets error:', err)
				cb(err)
			})
			

		//return p
	}
		
	Model.epochEnd = function(id, cb) {
		//a day is active if its basedate is between:
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
			.then(sets => {
				const set = sets[0]
				if(!set) return cb({
                    message: `Unknown Set End Id ${id}`,
                    status: 404,
                	statusCode: 404
                })
				return Model.app.models.Day.find({where: { and: [
					{id: set.day},
					{deleted: false}
				]}})
					.then(days => days[0])
					.then(day => {
						if(!day) throw new Error(`day id ${id}: Bad day ${JSON.stringify(day)}`)
						return Model.app.models.Day.epochEnd(day.id, (err, res) => {
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
				console.log('epochEnd Sets error:', err)
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
