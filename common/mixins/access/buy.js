// common/mixins/access/buy.js

const _ = require('lodash')



module.exports = function(Model) {

    Model.buy = function(req, buyObject, cb) {
        //console.log('buy buyObject', buyObject)
        //buyObject validation
        const props = Object.keys(buyObject).sort((a, b) => a.length - b.length)
        const propsLengthOk = props.length === 2
        const propsLengthDiffOk = propsLengthOk && (props[1].length - props[0].length === 2)
        //sort the field name first, the id second
        const propValuesOk = props
            .reduce((base, val, i) => {
                //create a regex to test the Id value with
                if(i === 0) return new RegExp(`^${val}`)
                //console.log('props reduce', base, val, i)
                return base.test(val)
            }, 0)
        const userId = req && req.user && req.user.ftUserId
        const valid = propsLengthOk && propsLengthDiffOk && propValuesOk
        if(!valid || !userId) return cb({
            message: 'Invalid buyObject: MalformedRequestError',
            status: 422,
            statusCode: 422
        })
        Model.clearCache(userId)
        const id = buyObject[props[1]]
        const selector = props[0] + 'Access'
        Model.access(req, selector, id, (err, accessAlready) => {

            if(err) {
                console.trace('buy access error', err)
                return cb(err)
            }
            if(accessAlready) return cb(undefined, 'Already Accessible')
            //get the cost for this id
            Model.cost(req, buyObject[props[1]], (err, costObject) => {

                if(err) {
                    console.trace('buy access cost error', err)
                    return cb(err)
                }
                const cost = costObject[props[0]]
                if(!_.isNumber(cost)) return cb('Invalid buyObject/costObject')
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
        })



    }


    Model.remoteMethod('buy', {
        accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            {arg: 'buyObject', type: 'object', http: { source: 'body' } }

        ],
        http: {path: '/buy', verb: 'post'},
        returns: {arg: 'data', type: 'object'}
    })
}