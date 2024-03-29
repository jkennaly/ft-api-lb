// bin/create_jwt.js

var crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
const { validate: uuidValidate } = require('uuid')
const dotenv = require("dotenv")
dotenv.config()

async function create(con, email, password, suppliedId) {
    try {
        console.log()
        if (!con || (!email && !suppliedId)) throw new Error('required parameter missing')
        //pull db entry for email
        const conn = con.promise()
        const stmt = `SELECT email, hashedpw, salt, access, username, DATE_FORMAT(timestamp, '%Y-%m-%dT%TZ') AS updated_at, emailVerified, mobile_auth_key, picture
      FROM Users 
    	WHERE ${suppliedId ? 'mobile_auth_key' : 'email'} = ? ;`

        const values = [suppliedId ?? email]
        //console.log('sql', stmt, values)
        const [results] = await conn.execute(stmt, values)

        if (results.length !== 1) throw new Error('Invalid Credentials')

        //hash given pw with salt
        const { email: emailDb, hashedpw, salt, access, username, updated_at, emailVerified, mobile_auth_key, picture } = results[0]
        if (!password) return { email: emailDb, access, username, updated_at, emailVerified, mobile_auth_key, picture }
        const hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        const givenpw = hash.digest('base64')
        //verify against stored pw
        const matchedpw = givenpw === hashedpw
        if (!matchedpw) throw new Error('Invalid Credentials')
        const validSub = uuidValidate(mobile_auth_key)
        const id = validSub ? mobile_auth_key : uuidv4()
        if (!validSub) {
            const stmt = `UPDATE Users SET mobile_auth_key = ? WHERE email = ? ;`
            const values = [id, emailDb]
            await con.execute(stmt, values)
            const stmt2 = `INSERT INTO user_aliases (user, alias) SELECT id, CONCAT('festigram|', mobile_auth_key) FROM Users WHERE email = ? ;`
            const values2 = [emailDb]
            await con.execute(stmt2, values2)
        }
        return { email: emailDb, access, username, updated_at, emailVerified, mobile_auth_key, picture }
    } catch (err) {
        console.error('invalid credentials for email ' + email + '/id ' + suppliedId)
        console.error(err)
        throw new Error('Get User failed')
    }

}

module.exports = create
