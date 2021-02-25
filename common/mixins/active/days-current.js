// common/mixins/active/days-current.js

const START_OFFSET = 2
const END_OFFSET = 3

module.exports = function(Day) {
	Day.allActiveIds = function(cb) {
		//a day is active if its date is active
		//find all active dates
		//flatmap to all active days
		return Day.app.models.Date.allActiveIds((err, dateIds) => {
	    	if(err) {
	    	  console.log('Day.allActiveIds Date.allActiveIds error day', err)
	    	  return cb(err)
	    	}
	    	return Day.find({where: {date: {inq: dateIds}}}, (err, activeDays) => {
		    	if(err) {
		    	  console.log('Day.allActiveIds Date.allActiveIds Day.find error', err)
		    	  return cb(err)
		    	}
		    	return cb(undefined, activeDays.map(d => d.id))

	    	})
		})
		
	}
	Day.isActive = function(id, cb) {
		//a day is active if its date is active
		//find date id
		// return Date.isActive(dateId, cb)
		return Day.find({where: {id: id}}, (err, days) => {
	    	if(err) {
	    	  console.log('Day.isActive Day.find( error day', id, err)
	    	  return cb(err)
	    	}
	    	if(days.length !== 1) {
	    	  console.log('Day.isActive Day.find( no found day', id)
	    	  return cb('Invalid Day')
	    	}
	    	const day = days[0]
	    	return Day.app.models.Date.isActive(day.date, cb)
		})
		
		
	}

	Day.remoteMethod('isActive', {
	    accepts: [{arg: 'id', type: 'number', required: true}],
	    http: {path: '/active/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'boolean'}
	})

	Day.remoteMethod('allActiveIds', {
	    http: {path: '/active', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})

}
