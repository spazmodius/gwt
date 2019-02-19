'use strict'

function* _flatMap(fn, values) {
	for (const value of values)
		yield* fn(value)
}

function flatMap(fn) {
	return _flatMap.bind(undefined, fn)
}

module.exports = flatMap
