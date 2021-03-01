// common/mixins/access/buy-full.js

const _ = require('lodash')

const FULL_ACCESS_PRICE = 10

module.exports = function(Profile) {

    Profile.buy = function(req, buyObject, cb) {
        //buyObject validation
        const props = Object.keys(buyObject).sort((a, b) => a.length - b.length)
        const propsLengthOk = props.length === 1
        const valid = propsLengthOk
        const userId = req && req.user && req.user.ftUserId
        if(!valid || !userId) return cb({
            message: 'Invalid buyObject: MalformedRequestError',
            status: 422,
            statusCode: 422
        })
        Profile.clearCache(userId)
        //get the cost for this id
        Profile.cost(req, (err, costObject) => {

            if(err) {
              console.trace('Profile.buy cost error', err)
              return cb(err)
            }
            const cost = costObject[props[0]]
            if(!_.isNumber(cost)) return cb({
                        message: "StripeMalformedRequestError: Invalid Full Access BuyObject",
                        status: 403,
                statusCode: 403
                    })
            const description = Object.assign({
                userId: userId
            }, buyObject)
            const sql_stmt = 'INSERT INTO ledger (user, category, bucks, description) VALUES (?, ?, ?, CAST(? AS JSON)) ;'
            const params = [userId, `${props[0]} Access`, cost * -1, JSON.stringify(description)]
            Profile.dataSource.connector.execute(sql_stmt, params, (err, results) => {
              if(err) {
                console.log('buy full save error', err)
                return cb(err)
              }
              
              cb(err, results)
            })
        })
    }

    Profile.fullAccessEnd = function(req, cb) {
        const userId = req && req.user && req.user.ftUserId
        if(!userId) return cb(undefined, 0)
        const sql_stmt = `SELECT id, bucks, timestamp 
            FROM ledger 
            WHERE 
                category LIKE ? AND 
                user=? AND bucks<0 AND 
                timestamp>DATE_SUB(curdate(), interval 1 year)
            ORDER BY id DESC;`
        const params = ['%Access', userId]
        Profile.dataSource.connector.execute(sql_stmt, params, (err, results) => {
          if(err) {
            //console.log('fulfillBucks save error', err)
            return cb(err)
          }
          const startDate = results.reduce((total, row, i, ar) => {
            if(!_.isNumber(total)) return total
            const newTotal = total - row.bucks
            if(newTotal >= FULL_ACCESS_PRICE) return row.timestamp.setFullYear(row.timestamp.getFullYear() + 1)
            if(i + 1 < ar.length) return newTotal
            return new Date()
          }, 0)
          //console.log('fullAccessEnd', results, startDate)
          
          cb(undefined, Math.floor(startDate.valueOf() / 1000))
        })
    }


    Profile.remoteMethod('fullAccessEnd', {
        accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}}

        ],
        http: {path: '/access/end', verb: 'get'},
        returns: {arg: 'data', type: 'object'}
    })

    Profile.remoteMethod('buy', {
        accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            {arg: 'buyObject', type: 'object', http: { source: 'body' } }

        ],
        http: {path: '/buy', verb: 'post'},
        returns: {arg: 'data', type: 'object'}
    })
}