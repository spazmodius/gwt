'use strict'
const assert = require('@spazmodius/assert')
const { inspect } = require('util')

function isString(value) {
	return typeof value === 'string'
}

assert.register(isString, value => `${inspect(value)} is a String`)

function isArray(value) {
	return Array.isArray(value)
}

assert.register(isArray, value => `${inspect(value)} is an Array`)

function isObject(value) {
	return typeof value === 'object'
}

assert.register(isObject, value => `${inspect(value)} is an Object`)

function isFunction(value) {
	return typeof value === 'function'
}

assert.register(isFunction, value => `${inspect(value)} is a Function`)

function isObjectOrFunction(value) {
	return typeof value === 'object' || typeof value === 'function'
}

assert.register(isObjectOrFunction, value => `${inspect(value)} is an Object or a Function`)

module.exports = assert
