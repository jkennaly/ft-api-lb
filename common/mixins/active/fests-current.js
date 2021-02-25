// common/mixins/active/fests-current.js

const START_OFFSET = 2
const END_OFFSET = 3

module.exports = function(Fest) {
	Fest.allActiveIds = function(cb) {
		//a set is active if its day is active
		return Fest.app.models.Date.allActiveIds((err, superIds) => {
	    	if(err) {
	    	  console.log('Fest.allActiveIds Date.allActiveIds error', err)
	    	  return cb(err)
	    	}
	    	return Fest.app.models.Date.find({where: {id: {inq: superIds}}}, (err, activeFests) => {
		    	if(err) {
		    	  console.log('Fest.allActiveIds Date.allActiveIds eDate.find error', err)
		    	  return cb(err)
		    	}
		    	return cb(undefined, activeFests.map(d => d.festival).filter((fid, i, ar) => ar.indexOf(fid) === i))

	    	})
		})
		
	}
	Fest.isActive = function(id, cb) {
		return Fest.allActiveIds((err, res) => {
	    	if(err) {
	    	  console.log('Fest.isActive error Fest', id, err)
	    	  return cb(err)
	    	}
	    	cb(undefined, res.includes(id))
		})	
	}

	Fest.remoteMethod('isActive', {
	    accepts: [{arg: 'id', type: 'number', required: true}],
	    http: {path: '/active/:id', verb: 'get'},
	    returns: {arg: 'data', type: 'boolean'}
	})

	Fest.remoteMethod('allActiveIds', {
	    http: {path: '/active', verb: 'get'},
	    returns: {arg: 'data', type: 'object'}
	})

}
