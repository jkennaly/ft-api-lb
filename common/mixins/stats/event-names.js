// common/mixins/stats/event-names.js

const _ = require('lodash')

const tierUp = {
	Festival: 'Series',
	Date: 'Festival',
	Day: 'Date',
	Set: 'Day'
}
var bucksCache = {}

module.exports = function(Event) {
	Event.chains = function(req, cb) {
		let eventIds
		try {
			eventIds = JSON.parse(req.query.events)
		} catch (err) {
			eventIds = []
		}
			//console.log('event-names', this.modelName, req.query, eventIds)
	    const key = `${this.modelName}.${JSON.stringify(eventIds)}` 
	    const cached = _.get(bucksCache, key)
	    if(_.isBoolean(cached) && cb) return cb(undefined, cached)
	    if(_.isBoolean(cached)) return cached

		const p = Event.find({where: {and: [
			{id: {inq: eventIds}},
			{deleted: false}
		]}})
		//for series, return name
		//for all other events, prepend with the event one tier up
		.then(evts => {
			if(this.modelName === 'Series') {
				const retVal = evts.map(e => [e])
					//console.log('EventChain retVal', retVal, eventIds)
				return retVal
			} 
			const nextTier = tierUp[this.modelName]
			const events = evts.map(x => x[nextTier.toLowerCase()])
					//console.log('EventChain evts', nextTier, events, evts)
			return Event.app.models[nextTier].chains({query: {events: JSON.stringify(events)}})
				.then(uppers => {
					const chains = evts.map(e => [
							...(uppers.find(u => u.length && u.find(el => e[nextTier.toLowerCase()] === el.id)) || []),
							e
						])
					//console.log('EventChain uppers', uppers)
					return chains
				})
		})
		
		.then((x) => {
			_.set(bucksCache, key, x)
			if(cb) return cb(undefined, x)
			return x
		})
		.catch(cb)
		if(!cb) return p
	}

	Event.remoteMethod('chains', {
		accepts: [
			{ arg: 'req', type: 'object', http: { source: 'req' } }
		],
		http: { path: '/name/chains', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})
}