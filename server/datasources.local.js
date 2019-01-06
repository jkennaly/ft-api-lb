let devObject = require('./datasources.json')

if(process.env.JAWSDB_URL) devObject.DragonAgeFestivalMaster = {
    "url": process.env.JAWSDB_URL + '?connectionLimit=2&debug=false',
    "connector": "mysql",
    "connectionLimit": 2
}

module.exports = devObject
