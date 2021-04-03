// flag.js

const _ = require("lodash")
module.exports = function(Flag) {
	Flag.advance = function(req, flagId, msg, cb) {
		const advancerId = req && req.user && req.user.ftUserId
		if (!advancerId || !_.isInteger(flagId)) {
			var error = {
				message: "Cannot modify this resource",
				status: 403,
				statusCode: 403
			}
			return cb(error)
		}
		Flag.findById(flagId)
			.then(flag => {
				if (!flag) {
					var error = {
						message: "Cannot modify this resource",
						status: 403,
						statusCode: 403
					}
					throw error
				}
				const advancerIsOriginator = advancerId === flag.fromuser
				const advancerIsAdmin = req.user.scope.includes("create:festivals")
				if ((!advancerIsOriginator && !advancerIsAdmin) || !flag.fromuser) {
					var error = {
						message: "Cannot modify this resource",
						status: 403,
						statusCode: 403
					}
					throw error
				}
				const updatedContent =
					[3, 5].includes(flag.status) && advancerIsOriginator
						? `${flag.content}\n${new Date().toUTCString()}: ${msg.msg}`
						: flag.content
				const updatedResponse =
					[1, 2, 5].includes(flag.status) && advancerIsAdmin
						? `${flag.response}\n${new Date().toUTCString()}: ${msg.msg}`
						: flag.response

				const statusChangeOk =
					([1, 2, 5].includes(flag.status) && advancerIsAdmin) ||
					([3, 5].includes(flag.status) && advancerIsOriginator)
				if (!statusChangeOk) {
					var error = {
						message: "Cannot modify this resource",
						status: 403,
						statusCode: 403
					}
					throw error
				}
				const nextStatus =
					flag.status === 1
						? 2
						: flag.status === 2
						? 3
						: flag.status === 3 && /d1scussion/i.test(msg.msg)
						? 5
						: flag.status === 3
						? 4
						: flag.status === 5 && advancerIsOriginator
						? 4
						: flag.status === 5 && advancerIsAdmin
						? 6
						: 0
				if (!nextStatus) {
					var error = {
						message: "Cannot modify this resource",
						status: 403,
						statusCode: 403
					}
					throw error
				}
				const newFlag = Object.assign(flag, {
					content: updatedContent,
					response: updatedResponse,
					status: nextStatus
				})
				//console.log("Flag.advance", flagId, newFlag)

				flag.updateAttributes(newFlag)
					.then(i => cb(undefined, i))
					.catch(err => {
						console.error("flag advance err", err)
					})
			})
			.catch(cb)
	}

	Flag.remoteMethod("advance", {
		accepts: [
			{ arg: "req", type: "object", http: { source: "req" } },
			{ arg: "flagId", type: "number", required: true },
			{ arg: "msg", type: "object", http: { source: "body" } }
		],
		returns: { arg: "data", type: "object" },
		http: { path: "/advance/:flagId" }
	})
}
