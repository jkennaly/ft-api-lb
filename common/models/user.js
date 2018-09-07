// user.js

var jwt = require('jsonwebtoken');

module.exports = function(User){


    User.deleteById = function(id, cb) {
      	User.findById(id).update(deleted, 1, cb);
    }
    User.getUserId = function(req, cb) {
    	const idToken = req.param('idToken')
    	const user = req.user
    	//decode the id_token
    	var decoded = jwt.decode(idToken);
    	console.log('getUserId idToken decoded')
    	//console.log(req.user)
    	//console.log(idToken)
    	console.log(decoded)
    	//compare the idToken user_id field and the user sub field to make sure they match
    	console.log(user.sub)
    	if(decoded.sub !== user.sub) {
    		cb(null, 0)
    		return
    	}
    	//call database function to get username from user sub
    		//check if sub has an aliased id and return if present
    	const sql_stmt = 'SELECT user FROM `user_aliases` WHERE alias=?'
    	const params = [user.sub]
    	const createUser = function (err, result) {
    		User.create({
    			email: decoded.email,
    			username: decoded.username || decoded.nickname || decoded.email,
    			picture: decoded.picture,
    			credits: 1
    		}, function (err, result) {
		    	const sql_stmt = 'SELECT id FROM `Users` WHERE email=?'
		    	const params = [decoded.email]
    			User.dataSource.connector.execute(sql_stmt, params, function (err, result) {
			    	const sql_stmt = 'INSERT INTO `user_aliases`(user, alias) VALUES (?, ?)'
			    	const params = [result[0].id, user.sub]
	    			User.dataSource.connector.execute(sql_stmt, params, err => err ? console.log(err) : undefined);
		    		cb(err, result[0].id)
    				
    			});

    		})
		    

    	}
    	const emailCheckCallback = function (err, result) {
    		if (err) {
    			console.log(err)
	    		cb(err, 0)
	    		return
    		}
    		console.log('emailCheckCallback')
    		console.log(result)
	    	if(result.length) {
	    		//create an alias to the user with the matching email
		    	const sql_stmt = 'INSERT INTO `user_aliases`(user, alias) VALUES (?, ?)'
		    	const params = [result[0].id, user.sub]
    			User.dataSource.connector.execute(sql_stmt, params, err => err ? console.log(err) : undefined);
	    		cb(err, result[0].id)
	    		return
	    	}
    	}
    	const callback = function (err, result) {
    		if (err) console.log(err);
    		console.log(result)
    		//if there is an error or a valid alias
	    	if(err || result.length) {
	    		cb(err, result.length ? result[0].user : 0)
	    		return
	    	}
	    	const emailVerified = decoded.email_verified
	    	if(emailVerified) {
		    	const sql_stmt = 'SELECT id FROM `Users` WHERE email=?'
		    	const params = [decoded.email]
    			User.dataSource.connector.execute(sql_stmt, params, emailCheckCallback);

	    	}

	    }
    	User.dataSource.connector.execute(sql_stmt, params, callback);

    		//if id_token says there is a verified email address, check existing user id fields for a matched email address,
    			// add an entry to the alias table for user sub and the user id
    			//return the user id
    		//if email address is not verified or there is no match, create a new user and return the user id for the new user, and add alias
      	//cb(null, 0);
    }

    User.remoteMethod('getUserId', {
      	accepts: [
			{arg: 'req', type: 'object', 'http': {source: 'req'}}
		],
        returns: {arg: 'id', type: 'number'},
        documented: false,
        http: {
        	verb: 'get'
        }
    });
};

