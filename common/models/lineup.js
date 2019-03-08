// lineup.js
var toTitleCase = function (str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};

module.exports = function(Lineup){


  Lineup.deleteById = function(id, cb) {
    Lineup.findById(id).update(deleted, 1, cb);
  }

    Lineup.batchDelete = function(data, cb) {

      //console.log('Lineup.batchDelete')
      //console.log(data)

      Promise.all(data.ids.map( id => Lineup.findById(id)))
      //first remove sets
        .then(lineups => Promise.all(lineups.map(lineup => Lineup.app.models.Set.lineupRemove(lineup))))
        //then remove lineups
        .then(() => data.ids.forEach(id => Lineup.deleteById(id,
        (err, instance) => {
          if(err) {
            //console.log('err')
            console.error(err)
          }
        }
      )))

      
      

    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    Lineup.batchUpdate = function(data, cb) {

      //console.log('Lineup.batchCreate')
      //console.log(data)

      data.forEach(dataEl => Lineup.updateAll({id: dataEl.id}, dataEl,
        (err, instance) => {
          if(err) {
            //console.log('err')
            console.error(err)
          }
        //console.log('Lineup.batchUpdate updateAll')
        //console.log(instance)
        //return instance
        }
      ))
      
      //add each artist to the forDay

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    Lineup.remoteMethod('batchUpdate', {
          accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
        http: {path: '/batchUpdate'}
    });

    Lineup.remoteMethod('batchDelete', {
          accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
        http: {path: '/batchDelete'}
    });

};

