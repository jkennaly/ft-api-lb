// place.js

module.exports = function(Place){


    Place.deleteById = function(id, cb) {
      Place.findById(id).update(deleted, 1, cb);
    }
    
    Place.batchCreate = function(data, cb) {

      //console.log('Place.batchCreate')
      //console.log(data)


      data.map(elData => Place.upsertWithWhere({
          festival: elData.festival, 
          name: elData.name
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
    
    Place.batchDelete = function(data, cb) {

      //console.log('Place.batchDelete')
      //console.log(data)

      data.map(elData => Place.deleteById(elData.id,
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

    Place.remoteMethod('batchCreate', {
          accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchCreate'}
    });
    Place.remoteMethod('batchDelete', {
          accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchDelete'}
    });
};

