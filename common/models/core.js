// core.js
var cache

module.exports = function(Core){

    Core.allData = function(cb) {
      if(cache) console.log('returning cache')
      if(cache && cache.timestamp && cache.timestamp > Date.now() - 24*3600*1000) return cb(null, cache)
      //series
      //festival
      //date
      //day
      //artist
      //artist alias
      //lineup
      //venue

      Promise.all([
          Core.app.models.Series.find(),
          Core.app.models.Festival.find(),
          Core.app.models.Date.find(),
          Core.app.models.Day.find(),
          Core.app.models.Set.find(),,
          Core.app.models.Artist.find(),
          Core.app.models.ArtistAlias.find(),
          Core.app.models.Venue.find(),
          Core.app.models.Image.find(),
          Core.app.models.Lineup.find(),
          Core.app.models.Organizer.find(),
          Core.app.models.Place.find(),
          Core.app.models.ArtistPriority.find(),
          Core.app.models.StagePriority.find(),
          Core.app.models.StageLayout.find(),
          Core.app.models.PlaceType.find(),
          Core.app.models.ParentGenre.find(),
          Core.app.models.Genre.find(),
          Core.app.models.ArtistGenre.find(),
          Core.app.models.MessageType.find(),
          Core.app.models.SubjectType.find()
        ])
        .then(([
            series, festival, date, day, set, artist, artistAlias, 
            venue,  images, lineups, organizers, places, 
            artistPriorities, stagePriorities, stageLayouts, 
            placeTypes, parentGenres, genres, artistGenres, 
            messageTypes, subjectTypes
          ]) => {
          return {
            timestamp: Date.now(),
            Series: series,
            Festivals: festival,
            Dates: date,
            Days: day,
            Sets: set,
            Artists: artist,
            ArtistAliases: artistAlias,
            Venues: venue,
            Images: images,
            Lineups: lineups,
            Organizers: organizers,
            Places: places,
            ArtistPriorities: artistPriorities,
            StagePriorities: stagePriorities,
            StageLayouts: stageLayouts,
            PlaceTypes: placeTypes,
            ParentGenres: parentGenres,
            Genres: genres,
            ArtistGenres: artistGenres,
            MessageTypes: messageTypes,
            SubjectTypes: subjectTypes,
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

