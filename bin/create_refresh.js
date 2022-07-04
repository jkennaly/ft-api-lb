// bin/create_jwt.js

const claimString = require('./tokens/name')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
//make one of these:


function create({ mobile_auth_key: id }) {
  if (!id) throw new Error('required refresh token parameter missing')

  const claimObject = Object.assign(
    {
      iss: 'https://festigram.app',
      aud: [
        'https://festigram.app/api/'
      ]
    },
    claimString(`fest|${id}`, 'sub'),
  )
  return jwt.sign(claimObject, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 90 * 24 * 60 * 60 })




}

module.exports = create
