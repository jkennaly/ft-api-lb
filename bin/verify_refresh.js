// bin/verify_refresh.js

const claimString = require('./tokens/name')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
//make one of these:


async function verify(con, refreshToken) {
    const conn = con.promise()
    const stmt = `SELECT mobile_auth_key
    FROM Users 
      WHERE mobile_auth_key = ? ;`
    const { sub } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const id = sub.slice(5)  //`fest|${id}`
    if (!id) throw new Error('required refresh token parameter missing')

    const values = [id]
    const [results] = await conn.execute(stmt, values)
    return results.length === 1 ? id : false
}

module.exports = verify
