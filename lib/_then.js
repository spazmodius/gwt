'use strict'

module.exports = function _then(description, expectation, ...extra) {
	// supported signatures:

	// when(fn)
	// when(fn, arg, ...args)
	// when(description, fn, ...args)
	// when(undefined, fn, ...args)

	if (typeof description === 'function') {
		if (arguments.length > 1)
			extra.unshift(expectation)
		expectation = description
		description = undefined
	}
	else if (description !== undefined)
		description = String(description)

	if (typeof expectation !== 'function')
		throw new TypeError('`expectation` is required function')

	return { description, expectation, extra }
}
