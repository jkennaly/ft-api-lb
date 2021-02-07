// common/mixins/buys.js


module.exports = function(Model) {

  Model.buyAccess = function(id) {
    
  }


  Model.remoteMethod('buyAccess', {
      accepts: [{arg: 'id', type: 'number', required: true}],
      http: {path: '/buyAccess/:id', verb: 'post'},
      returns: {arg: 'data', type: 'array'}
    })
}