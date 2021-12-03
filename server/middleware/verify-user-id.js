// server/middleware/verify-user-id.js
const _ = require('lodash')
//const mysql = require('mysql2')

//const connection = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false');

var inProgress = false

const aliased = []

module.exports = function(options) {
return function updateTable(req, res, next) {
  	console.log('verify-user-id', req.user)
  const aliasTable = req.app.get('aliasTable')

  if(req.user && !req.user.ftUserId) {
    const authId = req.user.sub
    const aliasTable = req.app.get('aliasTable')
    var foundAlias = aliasTable[authId]
    req.user.ftUserId = foundAlias
    if(!foundAlias && inProgress) {
      //console.log('waiting for alias table update', aliasTable, authId)
      return setTimeout(() => updateTable(req, res, next), 1000)
    }
    else if(!foundAlias && !inProgress && !aliased.includes(authId)) {
      inProgress = true
        //get highest id in alias Table
      const highId = _.reduce(aliasTable, (hi, el) => el && el > hi ? el : hi, 0)
      //load all aliases with ids higher
      req.conn
      	.then(connection => {
  	  //console.log('verify-user-id authId', authId, req.app.get('aliasTable')[authId])
 
      connection.execute(
        'SELECT * FROM `user_aliases` WHERE `id` > \'?\'',
        [highId])
      .then(([results, fields]) => {
            const resultPairs = results.map(r => [r.alias, r.user])
            _.assign(aliasTable, _.fromPairs(resultPairs))
            if(aliasTable[authId]) {
              req.user.ftUserId = aliasTable[authId]
              
              //console.log('userId Set A ' + req.user.ftUserId)

              //console.log('verify complete', authId)
                  inProgress = false
              next()
            }
              
              else {
                //user not found
                  inProgress = false
                  aliased.push(authId)
              next()
              }
              
            //console.log('using loaded alias')
            //console.log(req.user)
        }
      )
      .catch(err => {
      	inProgress = false
      	next(err)
      })
      })
      //connection.end()
    }
    else {
      next()
    }

  }
  else {
    next()
  }
}
}