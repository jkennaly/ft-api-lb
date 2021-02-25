// common/mixins/access/buy-full.js

const _ = require('lodash')



module.exports = function(Profile) {

    Profile.buy = function(req, buyObject, cb) {
        //buyObject validation
        const props = Object.keys(buyObject).sort((a, b) => a.length - b.length)
        const propsLengthOk = props.length === 1
        const valid = propsLengthOk
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
            const userId = req && req.user && req.user.ftUserId
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


    Profile.remoteMethod('buy', {
        accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            {arg: 'buyObject', type: 'object', http: { source: 'body' } }

        ],
        http: {path: '/buy', verb: 'post'},
        returns: {arg: 'data', type: 'object'}
    })
}