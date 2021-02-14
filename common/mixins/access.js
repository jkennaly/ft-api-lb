// common/mixins/buys.js

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5

const _ = require('lodash')

module.exports = function(Model) {

  Model.fullAccess = function(userId, cb) {
    //true if the user has spent 10 or more bucks on access in the last 365 days, false otherwise

    Model.bucksTowardsFull(userId, (err, results) => {
      if(err) {
        //console.log('fullAccess bucksTowardsFull error', err)
        return cb(err)
      }
      //console.log('bucksTowardsFull', results)
      const totalSpent = results
        //.reduce((total, row) => row.bucks && row.bucks < 0 ? total + row.bucks : total, 0)
      
      cb(undefined, Boolean(totalSpent > 9))
    })

  }
  Model.freeDateAccess = function(userId, cb) {
    //true if the user still has their free date access, false otherwise

    const sql_stmt = 'SELECT id FROM ledger WHERE category LIKE ? AND user=?;'
    const params = ['Free Date Access', userId]
    Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      
      cb(undefined, Boolean(results.length))
    })

  }
  Model.festAccess = function(festId, cb) {
    //true if the user has access to to festival with this id
    //also true if the user has full access
    if(!_.isNumber(festId)) {
      console.trace('Invalid festAccess festId')
      return cb(`Invalid Fest Id ${festId}`)
    }

    const userId = Model.app.get('ftUserId')
    //console.log('festAccess', festId)
    Model.fullAccess(userId, (err, results) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      //user has full access
    //console.log('festAccess fullAccess results', results)
      if(results) return cb(undefined, true)


      const sql_stmt = 'SELECT id FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.festivalId\')=?;'
      const params = ['%Access', userId, festId]
      Model.dataSource.connector.execute(sql_stmt, params, (err, ledgerIds) => {
        if(err) {
          //console.log('fulfillBucks save error', err)
          return cb(err)
        }
        //user has access to festival
    //console.log('festAccess fullAccess ledgerIds', ledgerIds)
        if(ledgerIds.length) return cb(undefined, Boolean(ledgerIds.length))
        //console.log('festAccess id', festId)
    //console.log('festAccess bucksTowardsFest')
        Model.bucksTowardsFest(festId, (err, result) => {
          if(err) {
            //console.log('fulfillBucks save error', err)
            return cb(err)
          }
    //console.log('festAccess bucksTowardsFest result', result)
          //user has paid enough to be at the cap
          cb(undefined, result >= FEST_CAP)
        })
      })
    })

  }
  Model.dateAccess = function(dateId, cb) {
    //true if the user has access to date with this id
    //true if the user has access to to festival with this id is part of
    //also true if the user has full access

    const userId = Model.app.get('ftUserId')
    const sql_stmt = 'SELECT id FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.dateId\')=?;'
    const params = ['%Access', userId, dateId]
    //console.log('access dateAccess dateId', dateId)
    Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      //user has date access
    //console.log('access dateAccess results', results)
      if(results.length) return cb(undefined, Boolean(results.length))
      Model.bucksTowardsDate(dateId, (err, result) => {
        if(err) {
          //console.log('fulfillBucks save error', err)
          return cb(err)
        }
    //console.log('access dateAccess bucksTowardsDate', result)
        //user has paid enoguh to be at the date cap
        if(result >= DATE_CAP) return cb(undefined, true)

        Model.app.models.Date.find({where: {id: dateId}}, (err, dates) => {
          if(err) {
            //console.log('access dateAccess datefind error', err)
            return cb(err)
          }
          const date = dates[0]
          //console.log('access dateAccess dateFind date', dateId, date)
          const date2 = JSON.parse(JSON.stringify(date))
          const festId = _.get(date2, 'festival')

          //user has festival access
          Model.app.models.Festival.festAccess(festId, cb)
        })
      })
    })
  }
  Model.dayAccess = function(dayId, cb) {
    //true if the user has access to date with this id
    //true if the user has access to to festival with this id is part of
    //also true if the user has full access

    const userId = Model.app.get('ftUserId')
    const sql_stmt = 'SELECT id FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.dayId\')=?;'
    const params = ['%Access', userId, dayId]
    Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      //console.log('Model.dayAccess', dayId, results)
      //user has day access
      if(results.length) return cb(undefined, Boolean(results.length))
      Model.app.models.Day.find({where: {id: dayId}}, (err, results) => {
        if(err) {
          //console.log('fulfillBucks save error', err)
          return cb(err)
        }
        const dateId = results.date
        Model.dateAccess(dateId, (err, hasDateAccess) => {
          if(err) {
            //console.log('fulfillBucks save error', err)
            return cb(err)
          }
          cb(undefined, hasDateAccess)
        })
      })
    })
  }
  Model.bucksTowardsDate = function(dateId, cb) {
    //bucks this user has towards the event, including all sub events
    const userId = Model.app.get('ftUserId')
    Model.app.models.Day.find({where: {date: dateId}}, (err, results) => {
      if(err) {
        //console.log('bucksTowardsDate day find error', err)
        return cb(err)
      }
      const dayIds = results.map(r => r.id)
      const sql_stmt = 'SELECT bucks FROM ledger WHERE category LIKE ? AND user=? AND ((`description` -> \'$.dateId\')=? OR FIND_IN_SET(`description` -> \'$.dayId\', \'?\')>0) ;'
      const params = ['%Access', userId, dateId, dayIds]
      Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
        if(err) {
          //console.log('bucksTowardsDate dateday query error', userId, dateId, dayIds, err)
          return cb(err)
        }
        const total = results.reduce((total, b) => total - b.bucks, 0)
        //console.log('bucksTowardsDate', dateId, results, total)
        cb(undefined, total)
      })
    })


  }
  Model.bucksTowardsFest = function(festId, cb) {
    //bucks this user has towards the event, including all sub events
    const userId = Model.app.get('ftUserId')
    //console.log('bucksTowardsFest', Object.keys(Model.app.models))
    Model.app.models.Date.find({where: {festival: festId}}, (err, results) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      const dateIds = results.map(r => r.id)
      //console.log('bucksTowardsFest', results)
      const sql_stmt = 'SELECT bucks FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.festivalId\')=? ;'
      const params = ['%Access', userId, festId]
      Model.dataSource.connector.execute(sql_stmt, params, (err, festBuys) => {
        if(err) {
          //console.log('bucksTowardsFest fest bucks error', err)
          return cb(err)
        }
        const festBucksSpent = festBuys && festBuys.length ? festBuys.reduce((total, b) => total + b.bucks, 0) : 0
        var dateBucksAcc = 0
        var dateCounter = 0
        dateIds.map(dateId => Model.bucksTowardsDate(dateId, (err, dateBucks) => {
          if(err) {
            //console.log('bucksTowardsFest date bucks error', err)
            return cb(err)
          }
          dateBucksAcc += dateBucks
          dateCounter++
          if(dateCounter >= dateIds.length) cb(undefined, dateBucksAcc - festBucksSpent)
          
        }))
      })
    })
  }
  Model.bucksTowardsFull = function(userId, cb) {
    //true if the user has spent 10 or more bucks on access in the last 365 days, false otherwise

    const sql_stmt = 'SELECT id, bucks FROM ledger WHERE category LIKE ? AND user=? AND bucks<0 AND timestamp>DATE_SUB(curdate(), interval 1 year);'
    const params = ['%Access', userId]
    Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      const totalSpent = results.reduce((total, row) => row.bucks && row.bucks < 0 ? total - row.bucks : total, 0)
      
      cb(undefined, totalSpent)
    })

  }

}