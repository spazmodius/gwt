'use strict'
const emitter = require('./emitter')
const formatFunction = require('../util/format-function')
const formatArguments = require('../util/format-arguments')
const { inspect } = require('util')

function scenario(givens, when, inputs) {
	const scenario = []

	for (let i = 0; i < givens.length; ++i) {
		const given = givens[i]
		const description = describe_given(given)
		if (description)
			scenario.push('Given ' + description)
	}

	scenario.push(' When ' + describe_when(when, inputs))

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

function describe_when({ description, action }, inputs) {
	return description || generateDescription_when(action, inputs)
}

function describe_then({ description, expectation, extra }) {
	return description || generateDescription_then(expectation, extra)
}

function generateDescription_when(action, inputs) {
	let description = formatFunction(action)
	if (inputs && inputs.length > 0) {
		const args = formatArguments(action, inputs)
		description += '(' + args.join(', ') + ')'
	}
	return description
}

function generateDescription_then(expectation, extra) {
	let description = formatFunction(expectation)
	if (extra && extra.length > 0) {
		const args = formatArguments(expectation, [null, null, ...extra]).slice(2)
		description += '(' + args.join(', ') + ')'
	}
	return description
}

module.exports = {
	scenario,
	test,
	result,
}
