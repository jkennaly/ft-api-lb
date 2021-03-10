// common/mixins/access/buys.js

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5

const _ = require('lodash')

const emptyAccess = {
  festivals: [],
  dates: [],
  days: [],
  sets: []
}

module.exports = function(Profile) {

  Profile.accessibleEvents = function(req, cb) {
    //true if the user has access to to festival with this id
    //also true if the user has full access
    const t1 = Date.now()
      
    const userId = req && req.user && req.user.ftUserId
    if(!userId) return cb(undefined, emptyAccess)

      const sql_stmt = `SELECT description 
        FROM ledger 
        WHERE 
          category LIKE ? AND 
          user=? AND 
          bucks<0 AND 
          timestamp>DATE_SUB(curdate(), interval 1 year);`
      const params = ['%Access', userId]
      Profile.dataSource.connector.execute(sql_stmt, params, (err, ledgerDescriptions) => {
      const t2 = Date.now()
      //console.log('t2 accessibleEvents', t2 - t1)
        if(err) {
          console.trace('accessible ledgerDescriptions sql_stmt error', err)
          return cb(err)
        }
        //user has access to festival
        //console.log('accessibleEvents fullAccess ledgerIds', ledgerIds)
        const bought = ledgerDescriptions.reduce((desObject, item) => {
          const keys = _.keys(JSON.parse(item.description)).filter(_.isString).filter(k => k !== 'userId')
          const idKey = keys.find(k => /Id$/.test(k))
          //console.log('accessible bought item', idKey, item)
          if(!idKey) return desObject
          const eventId = JSON.parse(item.description)[idKey]
          const desKey = idKey.slice(0, -2)
          desObject[desKey].push(eventId)
          return desObject

        }, {festival: [], date: [], day: []})
        //console.log('accessibleEvents bought', bought)

        Profile.app.models.Date.find({where: { and: [
          {festival: {inq: bought.festival}},
          {deleted: false}
        ]}} , (err, dates) => {
          if(err) {
            console.trace('accessible ledgerDescriptions sql_stmt error', err)
            return cb(err)
          }
          const t3 = Date.now()
          //console.log('t3 accessibleEvents', t3 - t2)
          const dateIds = _.uniq([...bought.date, ...(dates.map(d => d.id)) ])
          Profile.app.models.Day.find({where: { and: [
            {date: {inq: dateIds}},
            {deleted: false}
          ]}} , (err, days) => {
            if(err) {
              console.trace('accessible ledgerDescriptions sql_stmt error', err)
              return cb(err)
            }
            const t4 = Date.now()
            //console.log('t4 accessibleEvents', t4 - t3)
            const dayIds = _.uniq([...bought.day, ...(days.map(d => d.id)) ])
            Profile.app.models.Set.find({where: { and: [
              {day: {inq: dayIds}},
              {deleted: false}
            ]}} , (err, sets) => {
              if(err) {
                console.trace('accessible ledgerDescriptions sql_stmt error', err)
                return cb(err)
              }
              const t5 = Date.now()
              const setIds = sets.map(d => d.id)
              //console.log('t5 accessibleEvents', t5 - t4, t5 - t1)
              cb(undefined, {
                festivals: bought.festival,
                dates: dateIds,
                days: dayIds,
                sets: setIds
              })
              
            })
          })
        })


        
      })

  }
    Profile.remoteMethod('accessibleEvents', {
        accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}}

        ],
        http: {path: '/accessible', verb: 'get'},
        returns: {arg: 'data', type: 'object'}
    })
 
}