let devObject = require('./datasources.json')

if(process.env.JAWSDB_URL) devObject.DragonAgeFestivalMaster = {
    "url": process.env.JAWSDB_URL + '?connectionLimit=2',
    "connector": "mysql",
    "connectionLimit": 8
}

module.exports = devObject
