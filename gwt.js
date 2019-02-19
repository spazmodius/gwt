'use strict'
require('./lib/print-by-default')
const _given = require('./lib/_given')
const _when = require('./lib/_when')
const _then = require('./lib/_then')
const execute = require('./lib/execute')

const justThrow = err => { throw err }
const deferThrow = err => setImmediate(justThrow, err)

function given() {
	const scenario = {
		givens: [],
		when: undefined,
		thens: [],
	}

	const gwBuilder = {
		given: function given() {
			scenario.givens.push(_given(...arguments))
			return this
		},
		when: function when() {
			scenario.when = _when(...arguments)
			execute(scenario).catch(deferThrow)
			return tBuilder
		},
	}

	const tBuilder = {
		then: function then() {
			scenario.thens.push(_then(...arguments))
			return this
		},
	}

	return gwBuilder.given(...arguments)
}

given.when = function when() {
	return given().when(...arguments)
}

module.exports = given
