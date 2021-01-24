// bin/env_create.js

const fs = require("fs")
const path = require("path")
const crypto = require('crypto')
//requires: mysql connection config object
//optional: access = ['user']

//  mysql://root:password@localhost:port/dbName

function envCreate (dbconfig) {
	const connString = `mysql://${dbconfig.username}:${dbconfig.password}@${dbconfig.host}:${dbconfig.port}/${dbconfig.database}`
	const connLimit = 2
	const nodeEnv = `test`
	const secret = crypto.randomBytes(64).toString('base64')
	const env = 
`# .env
JAWSDB_URL=${connString}
# DEBUG=loopback:connector:mysql
CONN_LIMIT=${connLimit}
NODE_ENV=${nodeEnv}
LOCAL_SECRET=${secret}`
	//if there is already an env file, rename it to .envlocal
	if(fs.existsSync('../.env')) fs.renameSync('../.envlocal')
	fs.writeFile('../.env', env)

}

module.exports = envCreate
