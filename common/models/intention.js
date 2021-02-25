// intention.js
const _ = require('lodash')

module.exports = function(Intention){

    
    Intention.batchCreate = function(req, data, cb) {

      //console.log('Intention.batchCreate')
      //console.log(data)

    const userId = req && req.user && req.user.ftUserId

      data
        .filter(elData => elData && elData.subject && elData.subjectType)
        .map(elData => Intention.upsertWithWhere({
          subject: elData.subject, 
          subject_type: elData.subjectType, 
          user: userId
        }, 
        elData,
        (err, el) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
        }
      ))
      

    cb(null, 'OK');
      
    // the files are available as req.files.
    // the body fields are available in req.body
    }
    
    Intention.batchDelete = function(req, data, cb) {

      //console.log('Intention.batchDelete')
      //console.log(data)

      data
        .filter(_.isNumber)
        .map(elData => Intention.deleteById(elData,
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

    Intention.remoteMethod('batchCreate', {
          accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            { arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchCreate'}
    });
    Intention.remoteMethod('batchDelete', {
          accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            { arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchDelete'}
    });
};

