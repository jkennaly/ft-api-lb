// common/mixins/cost-day.js
const _ = require("lodash");

module.exports = function(Day) {
	Day.cost = function(id, cb) {
		//if the user has access, the cost is 0
		//get date cost
		//get festival cost
		//get full access cost

		const userId = Day.app.get("ftUserId");
		//console.log("cost-day");
		Day.dayAccess(id, (err, hasDayAccess) => {
			if (err) {
				//console.log('fulfillBucks save error', err)
				return cb(err);
			}
			//user has access
			//console.log("cost-day date-access", hasAccess);
			Day.find({ where: { id: id } }, (err, days) => {
				const dateId = days[0].date;
				//console.log("cost-day day-find dateId", dateId, days[0])
				Day.app.models.Date.dateAccess(dateId, (err, hasAccess) => {
					if (err) {
						//console.log('fulfillBucks save error', err)
						return cb(err);
					}
					//user has access
					//console.log("cost-day date-access", hasAccess);
					const costObject = {
						dateId: id,
						date: 0,
					};
					if (hasAccess) return cb(undefined, costObject);

					Day.app.models.Date.cost(dateId, (err, dateCost) => {
						if (err) {
							//console.log('fulfillBucks save error', err)
							return cb(err);
						}
						//console.log("cost-day dateCost", dateCost);
						const costObject = Object.assign(
							{
								dayId: id,
								day: hasDayAccess ? 0 : 1,
							},
							dateCost
						);
						cb(undefined, costObject);
					});
				});
			});
		});
	};

	Day.remoteMethod("cost", {
		accepts: [{ arg: "id", type: "number", required: true }],
		http: { path: "/cost/:id", verb: "get" },
		returns: { arg: "data", type: "object" },
	});

	Day.remoteMethod("dayAccess", {
		accepts: [{ arg: "id", type: "number", required: true }],
		http: { path: "/access/:id", verb: "get" },
		returns: { arg: "data", type: "object" },
	});
};
