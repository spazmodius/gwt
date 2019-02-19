'use strict'
const emitter = require('./emitter')
const formatFunction = require('../util/format-function')
const { inspect } = require('util')

function scenario(givens, when) {
	const scenario = []

	for (let i = 0; i < givens.length; ++i) {
		const given = givens[i]
		const description = describe_given(given)
		if (description)
			scenario.push('Given ' + description)
	}

	scenario.push(' When ' + describe_when(when))

	emitter.emit('scenario', { scenario })
}

function test(then, outcome) {
	const description = ' Then ' + describe_then(then)
	emitter.emit('test', Object.assign({ test: description }, outcome))
}

function result(result) {
	emitter.emit('result', result)
}

function describe_given({ description, context }) {
	return description || context.map(inspect).join(', ')
}

function describe_when({ description, action }) {
	return description || formatFunction(action)
}

function describe_then({ description, expectation }) {
	return description || formatFunction(expectation)
}

module.exports = {
	scenario,
	test,
	result,
}
