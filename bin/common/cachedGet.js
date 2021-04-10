// bin/common/cachedGet.js
const moment = require('moment-timezone/builds/moment-timezone-with-data-2012-2022.min')
const _ = require('lodash')
const axios = require('axios')

const siteCache = {}
const siteCacheTime = {}

const mondayBetween = pastTime => {
	const pastMondayStartEpochy = moment()
		.isoWeekday(1)
		.hour(0)
		.minute(0)
		.second(0)
		.millisecond(0)
		.valueOf()
	const pastTimeEpochy = moment(pastTime).valueOf()
	return pastTimeEpochy < pastMondayStartEpochy
}

const cachedGet = (url, opt) => {
	const key = `${url}.${JSON.stringify(opt)}`
	const time = _.get(siteCacheTime, key, 0)
	const cacheValid = time && !mondayBetween(time)
	if (cacheValid) return Promise.resolve(_.get(siteCache, key))
	return axios.get(url, opt).then(res => {
		_.set(siteCache, key, res)
		_.set(siteCacheTime, key, Date.now())
		return res
	})
}

module.exports = cachedGet