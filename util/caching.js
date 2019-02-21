'use strict'
const assert = require('./assert')

function cache(obj, symbol, value) {
	Object.defineProperty(obj, symbol, { value })
	return value
}

function caching(calc) {
	const $ = Symbol(calc.name || calc.toString())
	return function(obj) {
		assert.isObjectOrFunction(obj)
		return obj[$] || cache(obj, $, calc(obj))
	}
}

module.exports = caching
