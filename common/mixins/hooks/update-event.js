// common/mixins/hooks/update-event.js


'use strict';


const _ = require('lodash');

module.exports = function fromuserstamp(Model, options) {
 
  Model.observe('after save', function event(ctx, next) {


    Model.app.get('updateEvents')()
    next()
  });
};