'use strict'

module.exports = function _given(description, fn, ...values) {
	// supported signatures:

	// 0. given()
	// 1. given(value)
	// 2. given(value0, value1, ...values)
	// 3. given(fn)
	// 4. given(fn, arg, ...args)
	// 5. given(description)
	// 6. given(description, value, ...values)
	// 7. given(description, fn, ...args)

	if (description !== undefined && typeof description !== 'string') {
		if (arguments.length > 1)
			values.unshift(fn)
		fn = description
		description = undefined
	}
	if (fn !== undefined && typeof fn !== 'function') {
		values.unshift(fn)
		fn = undefined
	}

	const exec = fn === undefined? () => values: () => [ fn(...values) ]

	return { description, fn, values, exec }
}
