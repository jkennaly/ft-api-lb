// bin/create_jwt.js

console.log("Application starts ...");
var crypto = require('crypto')
const { v4: uuidv4} = require('uuid')
const { validate: uuidValidate } = require('uuid')

const claimString = require('./tokens/name')
const claimBool = require('./tokens/boolean')
const claimRoles = require('./tokens/roles')
const claimTime = require('./tokens/updated_at')
const claimScope = require('./tokens/scope')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
//make one of these:

/*
id claims:
{
  "__raw": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5UYzVSRGM1TjBORU1UY3hORFJHTTBVeU9EaEZSREpEUlRRM05UbEZRakZDTURBMFJrTkRSQSJ9.eyJodHRwczovL2Zlc3RpZ3JhbS9yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwibmlja25hbWUiOiJqa2VubmFseSIsIm5hbWUiOiJqa2VubmFseUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNTBhNjNiYjk3ODBmODIxNzg0YjJkYjdlNjljOGI2NjE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqay5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0xMi0xMFQwMDowNDo1NS44MDZaIiwiZW1haWwiOiJqa2VubmFseUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mZXN0aXZhbHRpbWUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDViNmFjZTAzYjc4NmY1MzFkZTM5ZjE2ZCIsImF1ZCI6Ijd4czFrem1DZGM5SFljMUNwMGJ1UWJBVEdVYjNqOUFsIiwiaWF0IjoxNjA3NTU4NzAwLCJleHAiOjE2MDc1OTQ3MDAsIm5vbmNlIjoiYkhFMU4zUjBiMHgyUlZKUlNWcElhbTFpVFhWMFZqRjRRVXBwUTBWS2QzVXlhblptYUdaTk9EUkNVUT09In0.oUftTCKNV14BzsBcGbFPvB1tFfaScwAfgLnr2Qbg6dZUjfiYIw-qrHMWOZ-l2iffO6Rn5DsXprk1J-_GcmqlbZ5j0Q7AWmAalGbkGFZkGvApfkondHbWKdCgS_ZNb_1np94akY2hhibaA5Rm0FsjqZpmv00BGKMoojjgUxK7oqOrcxcjFTA3eiiM3pP4QIdmDwFxkipkEmZDAAHvNaKhiFe9FqILVA2rd68NA-SteRYD6OwGvIgOaKjOo7VkaGVwozlrEXLm8-BemdgbC2dIg-PrwR8x59cwwMCY65AR2KNDhgGdmtL7_6Iv-07xvZvQr2EODR4AUfTJ9jRh6rSE-w",
  "https://festigram/roles": [
    "user",
    "admin"
  ],
  "nickname": "jkennaly",
  "name": "jkennaly@gmail.com",
  "picture": "https://s.gravatar.com/avatar/50a63bb9780f821784b2db7e69c8b661?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjk.png",
  "updated_at": "2020-12-10T00:04:55.806Z",
  "email": "jkennaly@gmail.com",
  "email_verified": true,
  "iss": "https://festivaltime.auth0.com/",
  "sub": "auth0|5b6ace03b786f531de39f16d",
  "aud": "7xs1kzmCdc9HYc1Cp0buQbATGUb3j9Al",
  "iat": 1607558700,
  "exp": 1607594700,
  "nonce": "bHE1N3R0b0x2RVJRSVpIam1iTXV0VjF4QUppQ0VKd3UyanZmaGZNODRCUQ=="
}
raw decoded:
{
  iss: 'https://festivaltime.auth0.com/',
  sub: 'auth0|5b6ace03b786f531de39f16d',
  aud: [
    'https://festigram.0441.design/api/',
    'https://festivaltime.auth0.com/userinfo'
  ],
  iat: 1607558700,
  exp: 1607645100,
  azp: '7xs1kzmCdc9HYc1Cp0buQbATGUb3j9Al',
  scope: 'openid profile email admin create:messages verify:festivals create:festivals admin create:messages create:festivals verify:festivals'
}
{
  alg: 'RS256',
  typ: 'JWT',
  kid: 'NTc5RDc5N0NEMTcxNDRGM0UyODhFRDJDRTQ3NTlFQjFCMDA0RkNDRA'
}
*/



function create (con, email, password, scopes) {
	if(!con || !email || !password) return Promise.reject(new Error('required parameter missing'))
	//pull db entry for email
    const stmt = `SELECT email, hashedpw, salt, access, username, DATE_FORMAT(timestamp, '%Y-%m-%dT%TZ') AS updated_at, emailVerified, mobile_auth_key, picture
      FROM Users 
    	WHERE email = ? ;`

    const values = [email]
	//execute statement
    return new Promise( ( resolve, reject ) => {
      con.execute(stmt, values, (err, results, fields) => {
      	if (err) return reject(err)
      	//console.log(results)
      	//console.log(fields)
      	resolve([results, fields])
      })
    })
      .then(([results, fields]) => {
        if(results.length !== 1) throw new Error('Invalid Credentials')
        return [
          results[0].email, 
          results[0].hashedpw, 
          results[0].salt, 
          results[0].access, 
          results[0].username, 
          results[0].updated_at, 
          results[0].emailVerified, 
          results[0].mobile_auth_key
        ] 

      })
      .then(([email, hashedpw, salt, access, username, updated_at, emailVerified, mobile_auth_key, picture]) => {
        //hash given pw with salt
        const hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        const givenpw = hash.digest('base64')
        //verify against stored pw
        const matchedpw = givenpw === hashedpw
        if(!matchedpw) throw new Error('Invalid Credentials')
        return [email, access, username, updated_at, emailVerified, mobile_auth_key, picture]
      })
      .then(([email, access, username, updated_at, emailVerified, mobile_auth_key, picture]) => {
        //verify valid mobile_auth_key
        const validSub = uuidValidate(mobile_auth_key)

        //generate and add a mobile_auth_key if invalid
        //construct statement to add user to alias table
        const id = validSub ? mobile_auth_key : uuidv4()
        if(validSub) return [email, access, username, updated_at, emailVerified, id, picture]
        return new Promise((resolve, reject) => {
          const stmt = `UPDATE Users SET mobile_auth_key = ? WHERE email = ? ;`
          const values = [id, email]
          con.execute(stmt, values, (err, results, fields) => {
            if (err) return reject(err)
            resolve()
          })
        })
            .then(() => new Promise((resolve, reject) => {
              const stmt = `INSERT INTO user_aliases (user, alias) SELECT id, CONCAT('festigram|', mobile_auth_key) FROM Users WHERE email = ? ;`
        
              const values = [email]
                con.execute(stmt, values, (err, results, fields) => {
                if (err) return reject(err)
                resolve()
              })
            }))
            .then(() => [email, access, username, updated_at, emailVerified, id, picture])
      })
      .then(([email, access, username, updated_at, emailVerified, id, picture]) => {
        const claimObject = Object.assign(
          {
            iss: 'http://festigram',
            aud: [
              'http://festigram/api/'
            ]
          },
          claimRoles(access),
          claimString(email),
          claimString(email, 'email'),
          claimString(username, 'nickname'),
          claimString(picture, 'picture'),
          claimString(`fest|${id}`, 'sub'),
          claimTime(updated_at),
          claimBool(emailVerified, 'email_verified'),
          claimScope(scopes, access)  
        )
        return claimObject
      })
      .then(claimObject => jwt.sign(claimObject, process.env.LOCAL_SECRET, {expiresIn: 3600}))




}

module.exports = create
