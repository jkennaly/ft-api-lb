 var http = require('http');
var schedule = require('node-schedule');
const mysql = require('mysql2');
const _ = require('lodash');

const START_OFFSET = 2
const END_OFFSET = 3

const sql_stmt = `
	SELECT *
	FROM dates 
	WHERE 
		deleted=0 AND 
		basedate>DATE_SUB(curdate(), interval 14 day);
	`
const offset_sql = `
	SELECT date dateId, max(days_offset) off
	FROM days 
	WHERE 
		deleted=0
	GROUP BY dateId;
	`
const day_sql = `
	SELECT id
	FROM days 
	WHERE 
		deleted=0 AND
		date IN (?);
	`
const set_sql = `
	SELECT id
	FROM sets 
	WHERE 
		deleted=0 AND
		day IN (?);
	`
const updateEvents = app => function(){
    //console.log('The answer to life, the universe, and everything!');
    const connection = mysql.createConnection(process.env.JAWSDB_URL + '?connectionLimit=1&debug=false');
    connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  //console.log('connected as id ' + connection.threadId + ' at ' + req.originalUrl);
})
    connection.execute(
      sql_stmt,
      [],
      (err, results) => {
        if(err) {
        	console.trace('update-active-events err', err)
        	return err
        }
        const currentDates = Array.from(results)
        //console.log('update-active-events cron res', results, currentDates)
        connection.execute(
	      offset_sql,
	      [],
	      (err, offsets) => {
	        if(err) {
	        	console.trace('update-active-events offset err', err)
	        	return err
	        }
	        //console.log('update-active-events cron res', results)
	        const dateOffsets = Array.from(offsets)
	        	.filter(r => currentDates.map(x => x.id).includes(r.dateId))
	        	.reduce((dO, o) => {
	        		dO[o.dateId] = o.off
	        		return dO
	        	} , {})

	        const activeDates = currentDates
	        	.filter(d => {
	        		const now = Date.now()
	        		const baseDate = () => new Date(d.basedate)
	        		const endDate = (baseDate()).setDate(baseDate().getDate() + dateOffsets[d.id] + END_OFFSET)
	        		const active = endDate.valueOf() > now
	        		return active
	        	})

        //console.log('update-active-events cron res', offsets, dateOffsets, activeDates)
	        const festivalIds = _.uniq(activeDates.map(d => d.festival))
	        const dateIds = activeDates.map(x => x.id)
	        connection.execute(
		      day_sql,
		      [dateIds.join(',')],
		      (err, days) => {
		        if(err) {
		        	console.trace('update-active-events offset err', err)
		        	return err
		        }
		        const dayIds = days.map(x => x.id)
	    		connection.execute(
			      set_sql,
			      [dayIds.join(',')],
			      (err, sets) => {
			        if(err) {
			        	console.trace('update-active-events offset err', err)
			        	return err
			        }
			        const setIds = sets.map(x => x.id)
			        const activeEvents = {
			        	Set: setIds,
			        	Day: dayIds,
			        	Date: dateIds,
			        	Festival: festivalIds
			        }
			        app.set('activeEvents', activeEvents)
			        //console.log('activeEvents', activeEvents)
		    		connection.end()
			      }
			    )
		      }
		    )
	      }
	    )
      }
    )
}
    
module.exports = function(app) {
	updateEvents(app)()
	app.set('updateEvents', updateEvents(app))
	var j = schedule.scheduleJob('0 * * * *', updateEvents(app));
};