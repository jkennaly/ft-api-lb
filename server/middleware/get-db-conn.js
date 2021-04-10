// server/middleware/get-db-conn.js

const mysql = require('mysql2/promise')
const connection = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false')

    
module.exports = function(options) {
  return function (req, res, next) {
    if(req.conn) return next()
    req.conn = connection
		.catch(err => {
			if(err) req.conn = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false')
			
		})
    next()
  }
}