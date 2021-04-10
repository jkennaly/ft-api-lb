// bin/common/appUrl.js

const subjectTypeRoute = {
	'2': 'artists',
	'7': 'fests'
}

const appUrl = so => {
	const url = `/#!/${subjectTypeRoute[so.subjectType]}/pregame/${so.subject}`
	return url
}

module.exports = appUrl