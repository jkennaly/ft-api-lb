// bin/create_gtt.js

//console.log("Application starts ...");
var crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
const { validate: uuidValidate } = require('uuid')

const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()



function create(con) {
  if (!con) return Promise.reject(new Error('required parameter missing'))

  //pull db entry for email
  const stmt = `SELECT email, hashedpw, salt, access, username, DATE_FORMAT(timestamp, '%Y-%m-%dT%TZ') AS updated_at, emailVerified, mobile_auth_key, picture
      FROM Users 
    	WHERE email = ? ;`

  const values = [email]
  //execute statement
  return new Promise((resolve, reject) => {
    con.execute(stmt, values, (err, results, fields) => {
      if (err) return reject(err)
      //console.log(results)
      //console.log(fields)
      resolve([results, fields])
    })
  })
    .then(([email, access, username, updated_at, emailVerified, id, picture]) => {
      //check for full access
      //if full access, get full access end
      //find accessible festivals
      //find accessible dates
      //find accessible days
      const claimObject = Object.assign(
        {
          iss: 'https://festigram.app',
          aud: [
            'https://festigram.app/api/'
          ],
          exp: 0
        },
        {
          full: true,
          "set": [],
          day: [],
          date: [],
          fest: []
        }
      )
      return claimObject
    })
    .then(claimObject => jwt.sign(claimObject, process.env.GT_ACCESS_SECRET))




}

module.exports = create
