// common/mixins/access/gt-access-token.js
const _ = require("lodash")
const jwt = require("jsonwebtoken")

const DATE_CAP = process.env.DATE_CAP || 3
const FEST_CAP = process.env.FEST_CAP || 5
const FULL_CAP = process.env.FULL_CAP || 10

var inProgress = {}
var tokenCache = {}

module.exports = function(Profile) {
	Profile.gtToken = function(req, cb) {
		//if the user has full access, the cost is 0
		//get full access cost
		const t0 = Date.now()
		const userId = req && req.user && req.user.ftUserId
		if (!userId)
			return cb({
				message: "MalformedRequestError: Invalid User Id",
				status: 403,
				statusCode: 403,
			})
		const key = `[${userId}]`
		const cached = _.get(tokenCache, key)
		console.log("Profile.gtToken", userId, cached, _.get(inProgress, key))
		if (!_.isUndefined(cached)) return cb(undefined, cached)
		if (_.get(inProgress, key))
			return cb({
				message: "Open Request Pending",
				status: 429,
				statusCode: 429,
			})
		//console.log("Profile.gtToken", userId, cached, _.get(inProgress, key))
		_.set(inProgress, key, true)
		Profile.ledger(userId, (err, userLedger) => {
			if (err) {
				console.trace("gtToken fullAccess", err)
				_.set(inProgress, key, false)
				return cb(err)
			}
			//console.log("Profile.ledger", userLedger)
			if (!userLedger.length) {
				const claimObject = Object.assign(
					{
						iss: "http://festigram",
						sub: userId,
						aud: ["http://festigram/api/"],
						exp: Math.floor(Date.now() / 1000) + 24 * 3600,
					},
					{
						full: false,
						sets: [],
						days: [],
						dates: [],
						festivals: [],
					}
				)
				const signed = jwt.sign(
					claimObject,
					process.env.GT_ACCESS_SECRET
				)
				_.set(inProgress, key, false)
				_.set(tokenCache, key, signed)
				//console.log("Profile.gtToken ledger", userId, userLedger, signed)
				return cb(undefined, signed)
			}

			//check for full access
			Profile.fullAccess(req, (err, fullAccess) => {
				const t1 = Date.now()
				//console.log('t1 gtToken', t1 - t0)
				if (err) {
					_.set(inProgress, key, false)
					console.trace("gtToken fullAccess", err)
					return cb(err)
				}
				//console.log("Profile.fullAccess", fullAccess)
				//if full access, get full access end
				if (fullAccess) {
					Profile.fullAccessEnd(req, (err, result) => {
						const t2 = Date.now()
						//console.log('t2 gtToken', t2 - t1)
						if (err) {
							_.set(inProgress, key, false)
							console.trace("gtToken fullAccessEnd", err)
							return cb(err)
						}
						//console.log('gtToken fullAccessEnd', result)
						const claimObject = Object.assign(
							{
								iss: "http://festigram",
								sub: userId,
								aud: ["http://festigram/api/"],
								exp: result,
							},
							{
								full: true,
								sets: [],
								days: [],
								dates: [],
								festivals: [],
							}
						)
						const signed = jwt.sign(
							claimObject,
							process.env.GT_ACCESS_SECRET
						)
						_.set(inProgress, key, false)
						_.set(tokenCache, key, signed)
						//console.log("Profile.gtToken full", userId, signed)
						return cb(undefined, signed)
					})
				} else {
					Profile.accessibleEvents(req, (err, result) => {
						const t3 = Date.now()
						//console.log('t3 gtToken', t3 - t1)
						if (err) {
							_.set(inProgress, key, false)
							console.trace("gtToken accessibleEvents", err)
							return cb(err)
						}
						//console.log("Profile.accessibleEvents", result)
						const accessibleDays = result.days
						Profile.app.models.Day.find(
							{
								where: {
									and: [
										{ id: { inq: accessibleDays } },
										{ deleted: false },
									],
								},
							},
							(err, days) => {
								if (err) {
									console.trace(
										"gtToken accessibleEvents find",
										err
									)
									//console.log("Profile.Day.find", days)
									_.set(inProgress, key, false)
									return cb(err)
								}
								Promise.all(
									days.map(
										d =>
											new Promise(function(
												resolve,
												reject
											) {
												Profile.app.models.Day.epochEnd(
													d.id,
													function(err, units) {
														if (err) {
															return reject(err)
														}
														return resolve(units)
													}
												)
											})
									)
								)
									.then(endTimes =>
										endTimes.sort((a, b) => b - a)
									)
									.then(([dateEnd, ...rest]) => {
										const t4 = Date.now()
										//console.log('t4 gtToken', t4 - t3)
										const exp = dateEnd
											? dateEnd
											: Date.now() + 24 * 3600 * 1000
										//console.log("Profile.gtt exp", exp)
										if (!exp)
											return cb({
												message: "No Purchased Events",
												status: 402,
												statusCode: 402,
											})
										const claimObject = Object.assign(
											{
												iss: "http://festigram",
												sub: userId,
												aud: ["http://festigram/api/"],
												exp: exp,
											},
											result
										)
										const signed = jwt.sign(
											claimObject,
											process.env.GT_ACCESS_SECRET
										)
										_.set(inProgress, key, false)
										_.set(tokenCache, key, signed)
										//console.log("Profile.gtToken days end",userId,signed)
										return cb(undefined, signed)
									})
									.catch(err => {
										console.trace(
											"gtToken accessibleEvents endTimes",
											err
										)
										_.set(inProgress, key, false)
										return cb(err)
									})
							}
						)
					})
				}
			})
		})
	}
	Profile.clearTokenCache = function(userId) {
		console.log("clearTokenCache", userId)
		delete inProgress[userId]
		delete tokenCache[userId]
	}

	Profile.remoteMethod("gtToken", {
		accepts: [{ arg: "req", type: "object", http: { source: "req" } }],
		http: { path: "/gtt", verb: "get" },
		returns: { arg: "token", type: "object" },
	})
}
