'use strict'
const _then = require('../lib/_then')
const assert = require('@spazmodius/assert')
const cartesian = require('./cartesian')

let count = 0

function then(...args) {
	++count
	return {
		resolves: (expected_description, expected_return) => {
			const { description, expectation, extra } = _then(...args)
			assert.equal(description, expected_description, undefined, ...args)
			Promise.resolve(expectation(...extra))
				.then(returned => assert.equal(returned, expected_return, undefined, ...args))
		},
		throws: () => {
			assert.that(_then, ...args)
				.throws(TypeError, undefined, ...args)
		}
	}
}

function isValid([ classes, expected_description, expected_return ]) {
	const descriptionOf = typeof expected_description === 'function'?
		expected_description:
		() => expected_description
	for (const args of cartesian(classes))
		then(...args).resolves(descriptionOf(...args), expected_return)
}

function isInvalid(classes) {
	for (const args of cartesian(classes))
		then(...args).throws()
}

function expectation() { return arguments.length }
function expectationp() { return Promise.resolve(arguments.length) }

const Description = [ 'a', 1, [], true, null ]
const Undefined = [ undefined ]
const Function = [ expectation, expectationp ]
const NonFunction = [ 'b', 2, [], true, null, undefined ]
const Anything = [ 'c', 3, [], true, expectation, null, undefined ]

const validCases = [
	[ [Function], undefined, 0],
	[ [Function, Anything], undefined, 1],
	[ [Function, Anything, Anything], undefined, 2],
	[ [Description, Function], String, 0],
	[ [Description, Function, Anything], String, 1],
	[ [Undefined, Function], undefined, 0],
	[ [Undefined, Function, Anything], undefined, 1],
]

const invalidCases = [
	[],
	[NonFunction],
	[NonFunction, NonFunction],
	[NonFunction, NonFunction, Anything],
	[NonFunction, NonFunction, Anything, Anything],
]

validCases.forEach(isValid)
invalidCases.forEach(isInvalid)
console.log(count, 'Tests Passed')
