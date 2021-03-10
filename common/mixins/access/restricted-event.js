// common/mixins/access/restricted-event.js


module.exports = function (Model, options) {
 
	Model.restricted = function(id, cb) {
        //event is restricted if its end time is in the future
        const activeEvents = Model.app.get('activeEvents')
        const index = Model.name
        console.log('Model.restricted id', id, index, activeEvents)
        const ids = activeEvents[index]
        const restricted = ids && ids.length && ids.includes(id)
        return cb(undefined, restricted)

        
        /*
        
        Model.epochEnd(id, (err, result) => {
    		if(err) {
    			if(/Unknown\s(Set|Day|Date|Festival)\sEnd\sId/.test(err.message)) return cb(undefined, true)
            	console.trace('restricted epochEnd error', err)
            	return cb(err)
            }
            const time = Date.now() / 1000
            return cb(undefined, time < result)
        	
        })
        
        */



    }


    Model.remoteMethod('restricted', {
        accepts: [
		    {arg: 'id', type: 'number', required: true}

        ],
        http: {path: '/restricted/:id', verb: 'get'},
        returns: {arg: 'data', type: 'object'}
    })
}