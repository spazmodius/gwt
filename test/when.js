'use strict'
const _when = require('../lib/_when')
const assert = require('@spazmodius/assert')
const cartesian = require('./cartesian')

let count = 0

function when(...all) {
	++count
	return {
		resolves: (expected_description, expected_return) => {
			const { description, action, extra } = _when(...all)
			assert.equal(description, expected_description, undefined, ...all)
			Promise.resolve(action(...extra))
				.then(returned => assert.equal(returned, expected_return, undefined, ...all))
		},
		throws: () => {
			assert.that(_when, ...all)
				.throws(TypeError, undefined, ...all)
		}
	}
}

function isValid([ classes, expected_description, expected_return ]) {
	const descriptionOf = typeof expected_description === 'function'?
		expected_description:
		() => expected_description
	for (const args of cartesian(classes))
		when(...args).resolves(descriptionOf(...args), expected_return)
}

function isInvalid(classes) {
	for (const args of cartesian(classes))
		when(...args).throws()
}

function fn() { return arguments.length }
function fp() { return Promise.resolve(arguments.length) }

const Description = [ 'a', 1, [], true, null ]
const Undefined = [ undefined ]
const Function = [ fn, fp ]
const NonFunction = [ 'b', 2, [], true, null, undefined ]
const Anything = [ 'c', 3, [], true, fn, null, undefined ]

const validCases = [
	[ [Function], undefined, 0],
	[ [Function, Anything], undefined, 1],
	[ [Function, Anything, Anything], undefined, 2],
	[ [Function, Anything, Anything, Anything], undefined, 3],
	[ [Description, Function], String, 0],
	[ [Description, Function, Anything], String, 1],
	[ [Description, Function, Anything, Anything], String, 2],
	[ [Description, Function, Anything, Anything, Anything], String, 3],
	[ [Undefined, Function], undefined, 0],
	[ [Undefined, Function, Anything], undefined, 1],
	[ [Undefined, Function, Anything, Anything], undefined, 2],
	[ [Undefined, Function, Anything, Anything, Anything], undefined, 3],
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
