// place.js

module.exports = function(Place) {
  Place.batchCreate = function(data, cb) {
    //console.log('Place.batchCreate')
    //console.log(data)
    if (!data || !data.length) return cb({
        message: 'No data supplied',
        status: 400,
        statusCode: 400
      })

    Promise.all(
      data
        .filter(d => d.festival && d.name)
        .map((dataEl) =>
          Place.upsertWithWhere(
            {
              festival: dataEl.festival,
              name: dataEl.name
            },
            dataEl
          )
        )
    )
      .then(() =>
        Place.find(
          {
            where: {
              festival: {
                inq: data
                  .map((x) => x.id)
                  .filter(x => x)
                  .reduce(
                    (pv, cv) => [
                      ...pv,
                      pv.includes(cv.festival) ? undefined : cv.festival
                    ],
                    []
                  )
              }
            }
          },
          cb
        )
      )
      .catch(cb)
  }

  Place.batchDelete = function(data, cb) {
    //console.log('Place.batchDelete')
    //console.log(data)
    if(!data.setIds || !data.setIds.length) return cb({
        message: 'No data supplied',
        status: 400,
        statusCode: 400
      })

    Promise.all(data.setIds.map((dataEl) => Place.deleteById(dataEl.id)))
      .then(() =>
        Place.find({ where: { id: { inq: data.map((x) => x.id) } } }, cb)
      )
      .catch(cb)
  }

  Place.remoteMethod('batchCreate', {
    accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
    http: { path: '/batchCreate' },
    returns: { arg: 'data', type: 'object' }
  })
  Place.remoteMethod('batchDelete', {
    accepts: [{ arg: 'data', type: 'array', http: { source: 'body' } }],
    http: { path: '/batchDelete' },
    returns: { arg: 'data', type: 'object' }
  })
}
