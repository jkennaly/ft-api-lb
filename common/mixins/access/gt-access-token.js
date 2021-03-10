// common/mixins/access/gt-access-token.js
const _ = require('lodash')
const jwt = require('jsonwebtoken')

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5
const FULL_CAP = process.env.FULL_CAP || 10

module.exports = function(Profile) {
	Profile.gtToken = function(req, cb) {
		//if the user has full access, the cost is 0
		//get full access cost
		//console.log('Profile.cost', cb, arguments)
    	const t0 = Date.now()
    	const userId = req && req.user && req.user.ftUserId
    	if(!userId) return cb({
            message: "MalformedRequestError: Invalid User Id",
            status: 403,
    		statusCode: 403
        })

        //check for full access
        Profile.fullAccess(req, (err, fullAccess) => {
      const t1 = Date.now()
      //console.log('t1 gtToken', t1 - t0)
        	if(err) {
        		console.trace('gtToken fullAccess', err)
        		return cb(err)
        	}
        	//if full access, get full access end
        	if(fullAccess) {
        		Profile.fullAccessEnd(req, (err, result) => {
      const t2 = Date.now()
      //console.log('t2 gtToken', t2 - t1)
		        	if(err) {
		        		console.trace('gtToken fullAccessEnd', err)
		        		return cb(err)
		        	}
		        	//console.log('gtToken fullAccessEnd', result)
	        		const claimObject = Object.assign(
			          {
			            iss: 'http://festigram',
			            sub: userId,
			            aud: [
			              'http://festigram/api/'
			            ],
			            exp: result
			          },
			          {
			            full: true,
			            sets: [],
			            days: [],
			            dates: [],
			            festivals: []
			          }
			        )
			        return cb(undefined, jwt.sign(claimObject, process.env.GT_ACCESS_SECRET))
        		})
        	}
        	else {
    			Profile.accessibleEvents(req, (err, result) => {
      const t3 = Date.now()
      //console.log('t3 gtToken', t3 - t1)
		        	if(err) {
		        		console.trace('gtToken accessibleEvents', err)
		        		return cb(err)
		        	}
		        	const accessibleDays = result.days
		        	Profile.app.models.Day.find({
		        		where: {and: [
		        			{id: {inq: accessibleDays}},
		        			{deleted: false}
		        		]}
		        	}, (err, days) => {
		        	if(err) {
		        		console.trace('gtToken accessibleEvents find', err)
		        		return cb(err)
		        	}
		        		Promise.all(days.map(d => new Promise(function(resolve, reject) {
					        Profile.app.models.Day.epochEnd(d.id, function(err, units) {
					            if (err) {
					                return reject(err);
					            }
					            return resolve(units);
					        })
					    })))
					    .then(endTimes => endTimes.sort((a, b) => b - a))
					    .then(([exp, ...rest]) => {
      const t4 = Date.now()
      //console.log('t4 gtToken', t4 - t3)
					    	if(!exp) return cb({
					            message: "No Purchased Events",
					            status: 402,
					    		statusCode: 402
					        })
			        		const claimObject = Object.assign(
					          {
					            iss: 'http://festigram',
			            		sub: userId,
					            aud: [
					              'http://festigram/api/'
					            ],
					            exp: exp 
					          },
					          result
					        )
					        return cb(undefined, jwt.sign(claimObject, process.env.GT_ACCESS_SECRET))
					    })
					    .catch(err => {
			        		console.trace('gtToken accessibleEvents endTimes', err)
			        		return cb(err)

					    })
		        	})
        		})
     
        	}
        })
    }

	Profile.remoteMethod('gtToken', {
	    accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}}
		],
	    http: {path: '/gtt', verb: 'get'},
	    returns: {arg: 'token', type: 'object'}
	})
}