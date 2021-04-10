// common/mixins/stats/subject-reviews.js

const _ = require('lodash')

module.exports = function(Message) {
	Message.reviews = function(req, subjectType, subject, cb) {
		const p = Message.find({where: {and: [
			{subjectType},
			{subject},
			{deleted: false},
			{or: [
				{messageType: 1},
				{messageType: 2}
			]}
		]}})
		.then(pieces => pieces.reduce((t, piece) => {
			if(piece.messageType === 1) t.comments.push(piece)
			if(piece.messageType === 2) t.ratings.push(piece)
			return t
		}, {comments: [], ratings: []}))
		.then(({comments, ratings}) => {
			const commentUsers = comments.map(x => x.fromuser)
			const ratingUsers = ratings.map(x => x.fromuser)
			const reviewerIds = _.intersection(commentUsers, ratingUsers)
			return Promise.all([
				comments, 
				ratings, 
				Message.app.models.Profile
					.find({where: {id: {inq: reviewerIds}}})
			])
		})
		.then(([comments, ratings, reviewers]) => {
			const reviews = reviewers.map(reviewer => { return {
				reviewer,
				comment: comments.find(c => c.fromuser === reviewer.id),
				rating: ratings.find(c => c.fromuser === reviewer.id)
			}})
			//console.log('subject-reviews.js', reviews)
			if(cb) return cb(undefined, reviews)
			return reviews
		})
		.catch(cb)
		if(!cb) return p
	}

	Message.remoteMethod('reviews', {
		accepts: [
			{ arg: 'req', type: 'object', http: { source: 'req' } },
			{ arg: 'subjectType', type: 'number', required: true },
			{ arg: 'subject', type: 'number', required: true }
		],
		http: { path: '/reviews/:subjectType/:subject', verb: 'get' },
		returns: { arg: 'data', type: 'object' }
	})
}
