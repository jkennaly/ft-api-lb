// bin/add_user.js

console.log("Application starts ...");
var crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
//requires: mysql connection, username, email, password
//optional: access = ['user']

function addUser (con, username, email, password, access = ['user']) {
	if(!con || !username || !email || !password) return new Error('required parameter missing')
	//get salt
	const salt = crypto.randomBytes(8)
        .toString('base64') /** convert to hexadecimal format */
        .slice(0,16)
	//hash pw
	const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
    hash.update(password)
    const hashedpw = hash.digest('base64')
    const id = uuidv4()
	//execute statement
    return new Promise( ( resolve, reject ) => {
		//construct statement 
	    const stmt = `INSERT INTO Users (username, email, hashedpw, salt, access, mobile_auth_key) 
	    	VALUES (?, ?, ?, ?, ?);`

	    const values = [username, email, hashedpw, salt, access, id]
        con.execute(stmt, values, (err, results, fields) => {
	    	if (err) return reject(err)
	    	resolve([results, fields])
	    })
    })
    	.then(res => {
    		//construct statement to add user to alias table
		    const stmt = `INSERT INTO user_aliases (user, alias) SELECT id, ? FROM Users;`
		    
		    const values = [`fest|${id}`]
	        con.execute(stmt, values, (err, results, fields) => {
		    	if (err) return reject(err)
		    	resolve(id)
		    })
    	})
}

module.exports = addUser
