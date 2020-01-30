'use strict'
const assert = require('@spazmodius/assert')
const getParameters = require('../util/getParameters')

let count = 0

function test(fn, expected) {
	assert.that(getParameters, fn).deepEqual(expected)
	++count
}

function namedNoArgs() {}
test(namedNoArgs, [])

function namedOneArg(a) {}
test(namedOneArg, [
	{ name: 'a', default: undefined, rest: false },
])

function namedTwoArgs(a, b) {}
test(namedTwoArgs, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: undefined, rest: false },
])

function namedWithDefault(a, b = 9) {}
test(namedWithDefault, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: '9', rest: false },
])

function namedWithRest(a, ...b) {}
test(namedWithRest, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: undefined, rest: true },
])

const anonNoArgs = function() {}
test(anonNoArgs, [])

const anonOneArg = function(a) {}
test(anonOneArg, [
	{ name: 'a', default: undefined, rest: false },
])

const anonTwoArgs = function(a, b) {}
test(anonTwoArgs, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: undefined, rest: false },
])

const anonWithDefault = function(a, b = 9) {}
test(anonWithDefault, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: '9', rest: false },
])

const anonWithRest = function(a, ...b) {}
test(anonWithRest, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: undefined, rest: true },
])

const arrowNoArgs = () => {}
test(arrowNoArgs, [])

const arrowOneArg = (a) => {}
test(arrowOneArg, [
	{ name: 'a', default: undefined, rest: false },
])

const arrowOneArgNoParens = a => {}
test(arrowOneArgNoParens, [
	{ name: 'a', default: undefined, rest: false },
])

const arrowTwoArgs = (a, b) => {}
test(arrowTwoArgs, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: undefined, rest: false },
])

const arrowWithDefault = (a, b = 9) => {}
test(arrowWithDefault, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: '9', rest: false },
])

const arrowWithRest = (a, ...b) => {}
test(arrowWithRest, [
	{ name: 'a', default: undefined, rest: false },
	{ name: 'b', default: undefined, rest: true },
])

function namedWithNewline(
) {}
test(namedWithNewline, [])

const anonWithNewline = function(
) {}
test(anonWithNewline, [])

const arrowWithNewline = (
) => {}
test(arrowWithNewline, [])

const arrowNestedArrow = a => b => {}
test(arrowNestedArrow, [
	{ name: 'a', default: undefined, rest: false },
])

console.log(count, 'Tests Passed')
