'use strict'
// const getParameters = require('./getParameters')

module.exports = function _when(description, action, ...extra) {
	// supported signatures:

	// when(fn)
	// when(fn, arg, ...args)
	// when(description, fn, ...args)
	// when(undefined, fn, ...args)

	if (typeof description === 'function') {
		if (arguments.length > 1)
			extra.unshift(action)
		action = description
		description = undefined
	}
	else if (description !== undefined)
		description = String(description)

	if (typeof action !== 'function')
		throw new TypeError('`action` is required function')

	// const parameters = getParameters(action)

	return {
		description,
		action,
		extra,
		// parameters,
	}
}
