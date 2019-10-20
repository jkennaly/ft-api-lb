// core.js
var cache

module.exports = function(Core){

    Core.allData = function(cb) {
      if(cache) console.log('returning cache')
      if(cache) return cb(null, cache)
      //series
      //festival
      //date
      //day
      //artist
      //artist alias
      //lineup
      //venue

      Promise.all([
          Core.app.models.Series.find({where: {id: {neq: 0}}}),
          Core.app.models.Festival.find(),
          Core.app.models.Date.find(),
          Core.app.models.Day.find(),
          Core.app.models.Artist.find(),
          Core.app.models.ArtistAlias.find(),
          Core.app.models.Venue.find(),
        ])
        .then(([series, festival, date, day, artist, artistAlias, venue]) => {
          return {
            series: series,
            festival: festival,
            date: date,
            day: day,
            artist: artist,
            artistAlias: artistAlias,
            venue: venue
          }
        })
        .then(coreData => cb(null, cache = coreData))
        .catch(cb)
        
    }


    Core.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Core.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'},
        http: {path: '/greet/:msg'}
    });
    Core.remoteMethod('allData', {
          returns: {arg: 'data', type: 'Object'},
        http: {path: '/all/data'}
    });
};

