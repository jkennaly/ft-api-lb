// date.js
const week = [
'Sunday',
'Monday',
'Tuesday',
'Wednesday',
'Thursday',
'Friday',
'Saturday'
]

module.exports = function(DateModel){



    DateModel.createWithDays = function(req, data, cb) {
      //console.log('DateModel.createWithDays ')
      //console.log(data.basedate)
    	//create the DateModel
      const userId = req && req.user && req.user.ftUserId
      if(!userId) {
          var error = {
              message: "Cannot modify this resource",
              status: 403,
              statusCode: 403
          }
          return cb(error)
      }
      //data.user = userId
      const dataWithUser = Object.assign({user: userId}, data)
      //console.log(`createWithDays `, dataWithUser)
      DateModel.create(dataWithUser, function(err, date) {
        if(err) {
          console.trace('createWithDays DateModel.create error', err)
          return cb(err)
        }
        if(!date.user) {
            var error = {
                message: "Cannot modify this resource by " + userId,
                status: 403,
                statusCode: 403
            }
            return cb(error)
        }
        const basedate = new Date(data.basedate)
      //console.log(`createWithDays DateModel.create`, date)
        for(var i=0;i<data.dayCount;i++){
          var iDate = new Date(data.basedate)
          iDate.setDate(iDate.getDate() + i)
      //console.log(iDate)
          date.days.create({
            date: date.id,
            name: week[iDate.getUTCDay()],
            daysOffset: i,
            user: userId
          })

        }
      cb(err, date);
      })
    }

    DateModel.remoteMethod('createWithDays', {
          accepts: [

            {arg: 'req', type: 'object', 'http': {source: 'req'}},
           { arg: 'data', type: 'object', http: { source: 'body' } }
          ],
        returns: {arg: 'data', type: 'object'}

    });
};

