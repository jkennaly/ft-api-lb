// server/views/vm/vm-list.js

var fs = require('fs')
const cachedGet = require('../../bin/common/cachedGet')

const _ = require('lodash')
const list = opt => cachedGet(opt.url, { baseURL: opt.baseUrl })
	.then(x => x.data)
	.then(series => series.filter(x => !x.deleted))
			
		
module.exports = list