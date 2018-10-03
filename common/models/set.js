// set.js

module.exports = function(Set){


    Set.deleteById = function(id, cb) {
      Set.findById(id).update(deleted, 1, cb);
    }
    

    Set.forDay = function(data, dayId, cb) {

      //console.log('Set.forDay')
      //console.log(dayId)
      //console.log(data)

      //find or create each artist
      data.artistIds.map(artistId => Set.create({band: artistId, user: data.user, day: dayId},
        (err, set) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
        }
      ))
      
      //add each artist to the forDay

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    Set.batchDelete = function(data, cb) {

      //console.log('Set.batchDelete')
      //console.log(data)

      //find or create each artist
      data.setIds.map(setId => Set.deleteById(setId,
        (err, set) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
        }
      ))
      
      //add each artist to the forDay

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    Set.batchCreate = function(data, cb) {

      //console.log('Set.batchCreate')
      //console.log(data)

      //find or create each artist
      data.map(setData => Set.create(setData,
        (err, set) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
        }
      ))
      
      //add each artist to the forDay

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    Set.batchUpdate = function(data, cb) {

      //console.log('Set.batchCreate')
      //console.log(data)

      //find or create each artist
      data.map(setData => Set.upsertWithWhere({id: setData.id}, setData,
        (err, set) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
        }
      ))
      
      //add each artist to the forDay

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    Set.remoteMethod('batchUpdate', {
          accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchUpdate'}
    });
    Set.remoteMethod('forDay', {
          accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } },
        {arg: 'dayId', type: 'number', required: true}],
        http: {path: '/forDay/:dayId'}
    });
    Set.remoteMethod('batchDelete', {
          accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
        http: {path: '/batchDelete'}
    });
    Set.remoteMethod('batchCreate', {
          accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchCreate'}
    });
};

