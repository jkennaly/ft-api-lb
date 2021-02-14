// common/mixins/buy.js

const _ = require('lodash')



module.exports = function(Model) {

    Model.buy = function(buyObject, cb) {
        //buyObject validation
        const props = Object.keys(buyObject).sort((a, b) => a.length - b.length)
        const propsLengthOk = props.length === 2
        const propsLengthDiffOk = props[1].length - props[0].length === 2
        //sort the field name first, the id second
        const propValuesOk = props
            .reduce((base, val, i) => {
                //create a regex to test the Id value with
                if(i === 0) return new RegExp(`^${val}`)
                //console.log('props reduce', base, val, i)
                return base.test(val)
            }, 0)
        const valid = propsLengthOk && propsLengthDiffOk && propValuesOk
        if(!valid) return cb('invalid buyObject')
        //get the cost for this id
        Model.cost(buyObject[props[1]], (err, costObject) => {

            if(err) {
              //console.log('fulfillBucks save error', err)
              return cb(err)
            }
            const cost = costObject[props[0]]
            if(!_.isNumber(cost)) return cb('Invalid buyObject/costObject')
            const userId = Model.app.get('ftUserId')
            const description = Object.assign({
                userId: userId
            }, buyObject)
            const sql_stmt = 'INSERT INTO ledger (user, category, bucks, description) VALUES (?, ?, ?, CAST(? AS JSON)) ;'
            const params = [userId, `${props[0]} Access`, cost * -1, JSON.stringify(description)]
            Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
              if(err) {
                console.log('buy save error', err, buyObject)
                return cb(err)
              }
              
              cb(err, results)
            })
        })



    }


    Model.remoteMethod('buy', {
        accepts: [
            {arg: 'buyObject', type: 'object', http: { source: 'body' } }

        ],
        http: {path: '/buy', verb: 'post'},
        returns: {arg: 'data', type: 'object'}
    })
}