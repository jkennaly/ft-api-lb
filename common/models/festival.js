// festival.js

const _ = require('lodash');

module.exports = function(Festival){



  Festival.superEventsPromise = function(id, cb) {
    return Promise.resolve({seriesIds: [Festival.findById(id).series]})
  }

  Festival.subEventsPromise = function(id) {
          
    const datesPromise = Festival.app.models.Date.find({where: {festival: id}})
    const daysPromise = datesPromise
      .then(dates => Festival.app.models.Day.find({where: {date: {inq: dates.map(x => x.id)}}}))
    const setsPromise = daysPromise
      .then(days => Festival.app.models.Set.find({where: {day: {inq: days.map(x => x.id)}}}))
    const allSubEvents = Promise.all([datesPromise, daysPromise, setsPromise])
      .then(([dates, days, sets]) => {
      	//console.log('allSubEvents', dates, days, sets)
        return {
          dates,
          days,
          sets
        }
      })
    return allSubEvents
  }

  Festival.relatedEvents = function(id, cb) {
    /*
      const logTime = (() => {
        const startTime = new Date()
        return description => result => {
          console.log(description)
          console.log('elapsed ms since Festival.relatedEvents ' + ((new Date()) - startTime))
          //console.log(result)
          return result
        }
      })()
      */
    const sql_stmt = 'SELECT * FROM `related_events` WHERE `festival`=\'?\''
    const params = [id]
    const eventsPromise = new Promise(function(resolve, reject) {
        Festival.dataSource.connector.execute(sql_stmt, params, function(err, units) {
            if (err) {
                return reject(err);
            }
            return resolve(units);
        })
      })
      .then(eventArray => eventArray.reduce((evObj, ev) => {
        evObj.seriesIds.push(ev.series)
        evObj.festivalIds.push(ev.festival)
        evObj.dateIds.push(ev.date)
        evObj.dayIds.push(ev.day)
        evObj.setIds.push(ev.set)
        return evObj
      }, {
        seriesIds: [],
        festivalIds: [],
        dateIds: [],
        dayIds: [],
        setIds: []
      }))
      .then(evObj => _.mapValues(evObj, ids => _.uniq(ids)))
      //.then(logTime('eventsPromise'))
      .catch(cb)

    return eventsPromise
    /*
    const superPromise = Festival.superEventsPromise(id, cb)
    const subPromise = Festival.subEventsPromise(id, cb)
    return Promise.all([superPromise, subPromise])
      .then(([superObj, subObj]) => _.assign(superObj, subObj))
      .catch(cb)
    */
  }


};

