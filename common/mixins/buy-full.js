// common/mixins/buy-full.js

const _ = require('lodash')



module.exports = function(Profile) {

    Profile.buy = function(buyObject, cb) {
        //buyObject validation
        const props = Object.keys(buyObject).sort((a, b) => a.length - b.length)
        const propsLengthOk = props.length === 1
        const valid = propsLengthOk
        //get the cost for this id
        Profile.cost((err, costObject) => {

            if(err) {
              //console.log('fulfillBucks save error', err)
              return cb(err)
            }
            const cost = costObject[props[0]]
            if(!_.isNumber(cost)) return cb('Invalid buyObject')
            const userId = Profile.app.get('ftUserId')
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
            {arg: 'buyObject', type: 'object', http: { source: 'body' } }

        ],
        http: {path: '/buy', verb: 'post'},
        returns: {arg: 'data', type: 'object'}
    })
}