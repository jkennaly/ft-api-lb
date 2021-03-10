// common/mixins/access/buy.js

const _ = require('lodash')


var ledgerCache = {}

module.exports = function(Model) {

    Model.ledger = function(userId, cb) {
        const key = `[${userId}]`
        const cached = _.get(ledgerCache, key)
        if(cached) return cb(undefined, cached)
        const sql_stmt = 'SELECT * FROM ledger WHERE user=? AND bucks<0 AND timestamp>DATE_SUB(curdate(), interval 1 year);'
        const params = [userId]
        Model.dataSource.connector.execute(sql_stmt, params, (err, raw) => {
          if(err) {
            //console.log('fulfillBucks save error', err)
            delete ledgerCache[userId]
            return cb(err)
          }
          //console.log('fullAccessEnd', results, startDate)
          const results = raw
            .map(x => {
                x.description = _.isString(x.description) && JSON.parse(x.description)
                return x
            })
          _.set(ledgerCache, key, results)
          cb(undefined, results)
        })
    }

  Model.clearBucksCache = function(userId) {
    delete ledgerCache[userId]
  }

}