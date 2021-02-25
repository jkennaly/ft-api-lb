// common/mixins/active/sets-current.js

const START_OFFSET = 2
const END_OFFSET = 3

module.exports = function(Set) {
	Set.allActiveIds = function(cb) {
		//a set is active if its day is active
		return Set.app.models.Day.allActiveIds((err, superIds) => {
	    	if(err) {
	    	  console.log('Set.allActiveIds Day.allActiveIds error day', err)
	    	  return cb(err)
	    	}
	    	return Set.find({where: {day: {inq: superIds}}}, (err, activeSets) => {
		    	if(err) {
		    	  console.log('Set.allActiveIds Day.allActiveIds Set.find error', err)
		    	  return cb(err)
		    	}
		    	return cb(undefined, activeSets.map(d => d.id))

	    	})
		})
		
	}
	Set.isActive = function(id, cb) {
		//a set is active if its day is active
		//find day id
		// return Day.isActive(dayId, cb)
		return Set.find({where: {id: id}}, (err, sets) => {
	    	if(err) {
	    	  console.log('Set.isActive Set.find( error day', id, err)
	    	  return cb(err)
	    	}
	    	if(sets.length !== 1) {
	    	  console.log('Set.isActive Set.find( no found', id)
	    	  return cb('Invalid Set')
	    	}
	    	const set = sets[0]
	    	return Set.app.models.Day.isActive(set.day, cb)
		})
		
		
	}

	Set.remoteMethod('isActive', {
	    accepts: [{arg: 'id', type: 'number', required: true}],
	    http: {path: '/active/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'boolean'}
	})

	Set.remoteMethod('allActiveIds', {
	    http: {path: '/active', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})

}
