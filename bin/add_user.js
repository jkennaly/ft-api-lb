console.log("Application starts ...");
var crypto = require('crypto')

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
	//construct statement
    const stmt = `INSERT INTO Users (username, email, hashedpw, salt, access) 
    	VALUES (?, ?, ?, ?, ?);`

    const values = [username, email, hashedpw, salt, access]
	//execute statement
    return new Promise( ( resolve, reject ) => {
        con.execute(stmt, values, (err, results, fields) => {
	    	if (err) return reject(err)
	    	resolve([results, fields])
	    })
    })
}

module.exports = addUser
