
const mysql = require('mysql2')


module.exports = function(options) {
return function(req, res, next) {
  	//console.log('verify-user-id', req.user)
  const aliasTable = req.app.get('aliasTable')

  if(req.user && !req.user.ftUserId) {
    const authId = req.user.sub
    const aliasTable = req.app.get('aliasTable')
    var foundAlias = aliasTable[authId]
    req.user.ftUserId = foundAlias
  	//console.log('verify-user-id foundAlias', foundAlias)
    if(foundAlias) {
      
    } else {
        //get highest id in alias Table
      const highId = _.reduce(aliasTable, (hi, el) => el && el > hi ? el : hi, 0)
      //load all aliases with ids higher
      
      const connection = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false');
      connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      //console.log('connected as id ' + connection.threadId + ' at ' + req.originalUrl);
      })
      connection.execute(
        'SELECT * FROM `user_aliases` WHERE `id` > \'?\'',
        [highId],
        (err, results, fields) => {
          if(err) return next(err)
            const resultPairs = results.map(r => [r.alias, r.user])
            _.assign(aliasTable, _.fromPairs(resultPairs))
            if(aliasTable[authId]) {
              req.user.ftUserId = aliasTable[authId]
              
              //console.log('userId Set A ' + req.user.ftUserId)

            }
              
              else {
                //user not found
              }
              
            //console.log('using loaded alias')
            //console.log(req.user)
        }
      )
      connection.end()
    }
  }
  next()
}
}