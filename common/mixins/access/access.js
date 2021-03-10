// common/mixins/access/buys.js

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5

const _ = require('lodash')
var dayjs = require('dayjs')
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
var bucksCache = {}

module.exports = function(Model) {

  Model.fullAccess = function(req, cb) {
    //true if the user has spent 10 or more bucks on access in the last 365 days, false otherwise

    const userId = req && req.user && req.user.ftUserId
    if(!userId) return cb(undefined, false)
    const key = `[${userId}][0].fullAccess`
    const cached = _.get(bucksCache, key)
    if(_.isBoolean(cached)) return cb(undefined, cached)
    Model.bucksTowardsFull(userId, (err, results) => {
      if(err) {
        console.trace('fullAccess bucksTowardsFull error', err)
        return cb(err)
      }
      //console.log('fullAccess bucksTowardsFull', results)
      const totalSpent = results
        //.reduce((total, row) => row.bucks && row.bucks < 0 ? total + row.bucks : total, 0)
      
          _.set(bucksCache, key, Boolean(totalSpent > 9))
      cb(undefined, Boolean(totalSpent > 9))
    })

  }
  Model.festAccess = function(req, festId, cb) {
    //true if the user has access to to festival with this id
    //also true if the user has full access
    const t0 = Date.now()
    if(!_.isNumber(festId)) {
      console.trace('Invalid festAccess festId', festId)
      return cb(`Invalid Fest Id ${festId}`)
    }

    const userId = req && req.user && req.user.ftUserId
    if(!userId) return cb(undefined, false)
    const key = `[${userId}][${festId}].festAccess`
    const cached = _.get(bucksCache, key)
    if(_.isBoolean(cached)) return cb(undefined, cached)
    //console.log('festAccess', festId, userId)
    Model.fullAccess(req, (err, results) => {
      const t1 = Date.now()
      //console.log('t1 festAccess', t1 - t0)
      if(err) {
          console.trace('access festAccess fullAccess error', err)
        return cb(err)
      }
      //user has full access
    //console.log('festAccess fullAccess results', results)

      if(results) {

          _.set(bucksCache, key, true)
          return cb(undefined, true)
        }


      const sql_stmt = 'SELECT id FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.festivalId\')=?;'
      const params = ['%Access', userId, festId]
      Model.ledger(userId, (err, raw) => {
      const t2 = Date.now()
      //console.log('t2 festAccess', t2 - t1)
        if(err) {
          console.trace('access festAccess sql_stmt error', err)
          return cb(err)
        }
        //user has access to festival
    //console.log('festAccess fullAccess ledgerIds', ledgerIds)

      const ledgerIds = raw
        .filter(e => /Access$/.test(e.category))
        .filter(e => e.description.festivalId === festId)
        .map(x => x.id)
        if(ledgerIds.length) {

          _.set(bucksCache, key, Boolean(ledgerIds.length))
          return cb(undefined, Boolean(ledgerIds.length))
        }
        //console.log('festAccess id', festId)
    //console.log('festAccess bucksTowardsFest')
        Model.bucksTowardsFest(userId, festId, (err, result) => {
      const t3 = Date.now()
      //console.log('t3 festAccess', t3 - t2)
          if(err) {
            console.trace('access festAccess  bucksTowardsFest error', err)
            return cb(err)
          }
    //console.log('festAccess bucksTowardsFest result', result)
          //user has paid enough to be at the cap

          _.set(bucksCache, key, result >= FEST_CAP)
          cb(undefined, result >= FEST_CAP)
        })
      })
    })

  }
  Model.dateAccess = function(req, dateId, cb) {
    //true if the user has access to date with this id
    //true if the user has access to to festival with this id is part of
    //also true if the user has full access
    const t0 = Date.now()

    const userId = req && req.user && req.user.ftUserId
    if(!userId) return cb(undefined, false)
    const key = `[${userId}][${dateId}].dateAccess`
    const cached = _.get(bucksCache, key)
    if(_.isBoolean(cached)) return cb(undefined, cached)
    //const sql_stmt = 'SELECT id FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.dateId\')=?;'
    //const params = ['%Access', userId, dateId]
    //console.log('access dateAccess dateId', dateId)
    Model.ledger(userId, (err, raw) => {
      const t1 = Date.now()
      //console.log('t1 dateAccess', t1 - t0)
      if(err) {
        console.trace('dateAccess sql_stmt error', err)
        return cb(err)
      }
      //user has date access
      //console.log('access dateAccess results', results)



      const results = raw
        .filter(e => /Access$/.test(e.category))
        .filter(e => e.description.dateId === dateId)
        //.map(x => x.id)
      if(results.length) return cb(undefined, Boolean(results.length))
      Model.bucksTowardsDate(userId, dateId, (err, result) => {
      const t2 = Date.now()
      //console.log('t2 dateAccess', t2 - t1)
        if(err) {
          console.trace('dateAccess bucksTowardsDate  error', err)
          return cb(err)
        }
        //console.log('access dateAccess bucksTowardsDate result', result)
        //user has paid enoguh to be at the date cap
        if(result >= DATE_CAP) {

          _.set(bucksCache, key, true)
          return cb(undefined, true)
        }

        Model.app.models.Date.find({where: {id: dateId}}, (err, dates) => {
      const t3 = Date.now()
      //console.log('t3 dateAccess', t3 - t2)
          if(err) {
            console.trace('dateAccess bucksTowardsDate Date.find error', err)
            return cb(err)
          }
          const date = dates[0]
          //console.log('access dateAccess dateFind date', dateId, date)
          try {
            const date2 = JSON.parse(JSON.stringify(date))
            const festId = _.get(date2, 'festival')

            //user has festival access
            Model.app.models.Festival.festAccess(req, festId, (err, result) => {
      const t4 = Date.now()
      //console.log('t4 dateAccess', t4 - t3)
              if(!err) _.set(bucksCache, key, result)
              cb(err, result)
            })
          }
          catch (err) {
            console.trace(dateId, dates, err)
            return cb(err)
          }        
        })
      })
    })
  }
  Model.dayAccess = function(req, dayId, cb) {
    //true if the user has access to date with this id
    //true if the user has access to to festival with this id is part of
    //also true if the user has full access
    const t0 = Date.now()

    const userId = req && req.user && req.user.ftUserId
    if(!userId) return cb(undefined, false)
    const key = `[${userId}][${dayId}].dayAccess`
    const cached = _.get(bucksCache, key)
    if(_.isBoolean(cached)) return cb(undefined, cached)
    const sql_stmt = 'SELECT id FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.dayId\')=?;'
    const params = ['%Access', userId, dayId]
    Model.ledger(userId, (err, raw) => {
    const t1 = Date.now()
    //console.log('t1 dayAccess', t1 - t0)
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      //console.log('Model.dayAccess', dayId, results)
      //user has day access
      const results = raw
        .filter(e => /Access$/.test(e.category))
        .filter(e => e.description.dayId === dayId)
        //.map(x => x.id)
    //console.log('dayAccess Model.ledger', dayId, raw, results)
      if(results.length) {

          _.set(bucksCache, key, Boolean(results.length))
        return cb(undefined, Boolean(results.length))
      }
      Model.app.models.Day.find({where: {id: dayId}}, (err, results) => {
    const t2 = Date.now()
    //console.log('t2 dayAccess', t2 - t1)
        if(err) {
          //console.log('fulfillBucks save error', err)
          return cb(err)
        }
        const dateId = _.get(results, '[0].date')
        if(!dateId) {

          _.set(bucksCache, key, false)
          return cb(undefined, false)
        }
        Model.dateAccess(req, dateId, (err, hasDateAccess) => {
    const t3 = Date.now()
    //console.log('t3 dayAccess', t3 - t2)
          if(err) {
            //console.log('fulfillBucks save error', err)
            return cb(err)
          }
          _.set(bucksCache, key, hasDateAccess)
          cb(undefined, hasDateAccess)
        })
      })
    })
  }
  Model.bucksTowardsDate = function(userId, dateId, cb) {
    //bucks this user has towards the event, including all sub events
    if(!userId) return cb(undefined, 0)
    const key = `[${userId}][${dateId}].dateBucks`
    const cached = _.get(bucksCache, key)
    if(_.isNumber(cached)) return cb(undefined, cached)
    Model.app.models.Day.find({where: {date: dateId}}, (err, results) => {
      if(err) {
        //console.log('bucksTowardsDate day find error', err)
        return cb(err)
      }
      const dayIds = results.map(r => r.id)
      const sql_stmt = 'SELECT bucks FROM ledger WHERE category LIKE ? AND user=? AND ((`description` -> \'$.dateId\')=? OR FIND_IN_SET(`description` -> \'$.dayId\', \'?\')>0) ;'
      const params = ['%Access', userId, dateId, dayIds]
      Model.ledger(userId, (err, raw) => {
        if(err) {
          //console.log('bucksTowardsDate dateday query error', userId, dateId, dayIds, err)
          return cb(err)
        }
      const results = raw
        .filter(e => /Access$/.test(e.category))
        .filter(e => e.description.dateId === dateId || e.description.dayId && dayIds.includes(e.description.dayId))
        //.map(x => x.id)
        const total = results.reduce((total, b) => total - b.bucks, 0)
        //console.log('bucksTowardsDate', dateId, raw, dayIds, results, total)
          _.set(bucksCache, key, total)
        cb(undefined, total)
      })
    })


  }
  Model.bucksTowardsFest = function(userId, festId, cb) {
    //bucks this user has towards the event, including all sub events
    //console.log('bucksTowardsFest', Object.keys(Model.app.models))
    if(!userId) return cb(undefined, 0)
    const key = `[${userId}][${festId}].festBucks`
    const cached = _.get(bucksCache, key)
    if(_.isNumber(cached)) return cb(undefined, cached)
    Model.app.models.Date.find({where: {festival: festId}}, (err, results) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      const dateIds = results.map(r => r.id)
      //console.log('bucksTowardsFest Date.find', results)
      const sql_stmt = 'SELECT bucks FROM ledger WHERE category LIKE ? AND user=? AND (`description` -> \'$.festivalId\')=? ;'
      const params = ['%Access', userId, festId]
      Model.ledger(userId, (err, raw) => {
        if(err) {
          //console.log('bucksTowardsFest fest bucks error', err)
          return cb(err)
        }

        const festBuys = raw
          .filter(e => /Access$/.test(e.category))
          .filter(e => e.description.festivalId === festId)
          //.map(x => x.bucks)
        //console.log('bucksTowardsFest Model.ledger', raw, festBuys)
        const festBucksSpent = festBuys && festBuys.length ? festBuys.reduce((total, b) => total + b.bucks, 0) : 0
        var dateBucksAcc = 0
        var dateCounter = 0
        if(dateIds.length) {
          dateIds.map(dateId => Model.bucksTowardsDate(userId, dateId, (err, dateBucks) => {
            if(err) {
              //console.log('bucksTowardsFest date bucks error', err)
              return cb(err)
            }
            //console.log('bucksTowardsFest bucksTowardsDate', raw, dateBucks)
        dateBucksAcc += dateBucks
            dateCounter++
            if(dateCounter >= dateIds.length) {
              _.set(bucksCache, key, dateBucksAcc - festBucksSpent)
              cb(undefined, dateBucksAcc - festBucksSpent)
            }
            
          }))
        } else {
          _.set(bucksCache, key, festBucksSpent)
          cb(undefined, festBucksSpent)
        }
      })
    })
  }
  Model.bucksTowardsFull = function(userId, cb) {
    //true if the user has spent 10 or more bucks on access in the last 365 days, false otherwise

    if(!userId) return cb(undefined, 0)
    const key = `[${userId}].full`
    const cached = _.get(bucksCache, key)
    if(_.isNumber(cached)) return cb(undefined, cached)
    const sql_stmt = 'SELECT id, bucks FROM ledger WHERE category LIKE ? AND user=? AND bucks<0 AND timestamp>DATE_SUB(curdate(), interval 1 year);'
    const params = ['%Access', userId]
    Model.ledger(userId, (err, raw) => {
      if(err) {
        //console.log('fulfillBucks save error', err)
        return cb(err)
      }
      const results = raw
        .filter(e => /Access$/.test(e.category))
        .filter(e => dayjs(e.timestamp).isSameOrAfter(dayjs().subtract(1, 'year'), 'day'))

        
      const totalSpent = results.reduce((total, row) => row.bucks && row.bucks < 0 ? total - row.bucks : total, 0)
      
          _.set(bucksCache, key, totalSpent)
      cb(undefined, totalSpent)
    })

  }
  Model.clearBucksCache = function(userId) {
    if(Model.clearLedgerCache) Model.clearLedgerCache(userId)
    delete bucksCache[userId]
  }

  const method = {
    day: `dayAccess`,
    date: `dateAccess`,
    festival: `festAccess`,
    profile: `fullAccess`
  }
  Model.access = function(req, selector, id, cb) {
    return Model[selector](req, id, cb)

  }

}