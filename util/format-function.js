'use strict'
const codeOf = require('./codeOf')
const assert = require('./assert')

function formatFunction(fn) {
	assert.isFunction(fn)
	return fn.name || codeOf(fn)
}

module.exports = formatFunction
