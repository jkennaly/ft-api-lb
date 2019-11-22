// set.js

module.exports = function(Set){
  /*
  Set.on('dataSourceAttached', function(obj){
      console.log('Set.deleteById attachment')
    var del = function(id, cb) {
      console.log('Set.deleteById', id)
      Set.update({id: id}, {deleted: true}, cb);
    }
    Set.deleteById = function(id, cb) {
      return del.apply(this, arguments)
    };
  })
*/
  Set.prototype.getFestivalId = function() {
    //console.log('Set.getFestivalId', this.days.get())
    return Set.app.models.Day.findById(this.day)
      .then(day => Set.app.models.Date.findById(day.date))
      .then(date => Set.app.models.Festival.findById(date.festival))
  }
/*
  Set.prototype.getFestivalId = function() {
    return this.day.get()
      .then(day => day.dates.get())
      .then(date => date.festival)
  }
*/

  

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
          console.error(err)
        }
      }
    ))
    
    //add each artist to the forDay

    
  // the files are available as req.files.
  // the body fields are available in req.body
  cb(null, 'OK');
  }

  Set.lineupRemove = function(lineup) {

    //console.log('Set.lineupRemove', lineup)

    if(!lineup) return

    //first get the sets for the band
    Set.find({
      where: {
        band: lineup.band
      }
    })
      //.then(sets => console.log(`sets to remove`, sets) || sets)
      //narrow to only sets for the lineup festival
      .then(sets => Promise.all(sets.map(s => Promise.all([s.id, s.getFestivalId()]))))
      .then(setFests => setFests.filter(s => s[1] === lineup.festival))
      .then(setsToRemove => setsToRemove.length && Set.batchDelete({setIds: setsToRemove.map(s => s[0])}, x => {}))
      .catch(err => console.error(err))

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

