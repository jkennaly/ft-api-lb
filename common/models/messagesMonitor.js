// messagesMonitor.js

const _ = require('lodash')
module.exports = function(MessagesMonitor){


    
    MessagesMonitor.batchCreate = function(data, cb) {

      //console.log('MessagesMonitor.batchCreate')
      //console.log(data)

    if (!data || !data.length) return cb({
        message: 'No data supplied',
        status: 400,
        statusCode: 400
      })

      data
        .filter(d => d.message)
        .map(elData => MessagesMonitor.upsertWithWhere({
          message: elData.message
        }, 
        elData,
        (err, el) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
        }
      ))
      

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }
    
    MessagesMonitor.batchDelete = function(data, cb) {

      //console.log('MessagesMonitor.batchDelete')
      //console.log(data)

    if (!data || !data.length) return cb({
        message: 'No data supplied',
        status: 400,
        statusCode: 400
      })
      data
        .filter(_.isInteger)
        .map(elData => MessagesMonitor.deleteById(elData,
        (err, el) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
        }
      ))
      

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    MessagesMonitor.remoteMethod('batchCreate', {
          accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchCreate'}
    });
    MessagesMonitor.remoteMethod('batchDelete', {
          accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchDelete'}
    });
};

