// delete-override.js

module.exports = function(Model) {
  Model.removeById = Model.deleteById = Model.destroyById = function(id, options, cb) {
    if (cb === undefined) {
      if (typeof options === 'function') {
        // destroyById(id, cb)
        cb = options;
        options = undefined
      }
    }
    cb = cb || createPromiseCallback();

    Model.update({id: id}, {deleted: true}, options, cb)
    return cb.promise;
  };
}