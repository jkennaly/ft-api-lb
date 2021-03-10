// server/boot/core-data.js

const mysql = require('mysql2');
const _ = require('lodash');

module.exports = function(app, callback) {
  
    app.models.Core.allData(callback)
}
