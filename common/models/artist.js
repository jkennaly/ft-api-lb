// artist.js


var toTitleCase = function (str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};

module.exports = function(Artist){

    Artist.deleteById = function(id, cb) {
      Artist.findById(id).update(deleted, 1, cb);
    }

    Artist.festivalLineup = function(req, festivalId, cb) {
      const str = req.files[0].buffer.toString()
      const artistNameAr = str.split('\n').map(s => toTitleCase(s).trim())
      //console.log(artistNameAr);

      //find or create each artist
      artistNameAr.map(artistName => Artist.findOrCreate({where: {name: artistName}},
        {name: artistName},
        (err, artist, created) => {
          if(err) {
            //console.log('err')
            console.log(err)
          }
          //console.log('created ' + created)
          //console.log(artist)
          artist.lineups.create({
            festival: festivalId,
            band: artist.id
          }, err => console.log(err))
          
        }
      ))
      
      //add each artist to the festivalLineup

      
    // the files are available as req.files.
    // the body fields are available in req.body
    cb(null, 'OK');
    }

    Artist.remoteMethod('festivalLineup', {
          accepts: [
        {
        arg: 'req', type: 'object', http: function (ctx) {
            return ctx.req;
        }
        },
        {arg: 'festivalId', type: 'number', required: true}],
        http: {path: '/festivalLineup/:festivalId'}
    });
};




