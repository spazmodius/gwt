'use strict'
const assert = require('./assert')
const pipeline = require('./pipeline')
const compress = require('./compress-js')
const caching = require('./caching')

const splitOnChar = require('./split-on-char')
const splitOnCommas = splitOnChar.bind(null, ',')
const splitOnEqual = splitOnChar.bind(null, '=')

const rxFunctionArgs = /^function[^(]*\((.*)\)\s*{/
const rxArrowArgs = /^(.*)=>/

function getParameters(fn) {
	return parseParameters(fn.toString())
}

function parseParameters(code) {
	const parms = (rxFunctionArgs.exec(code) || rxArrowArgs.exec(code))[1]
	assert.isString(parms)

	return pipeline(parms, [
		compress,
		stripParens,
		stripTrailingComma,
		splitOnCommas,
		toDescriptors,
	])
}

function stripParens(sig) {
	assert.isString(sig)
	if (sig.startsWith('(') && sig.endsWith(')'))
		return sig.slice(1, -1)
	return sig
}

function stripTrailingComma(sig) {
	assert.isString(sig)
	if (sig.endsWith(','))
		return sig.slice(0, -1)
	return sig
}

function toDescriptors(parms) {
	assert.isArray(parms)
	return parms.map(toDescriptor)
}

function toDescriptor(parm) {
	assert.isString(parm)
	let rest = false, [ name, defaultValue ] = splitOnEqual(parm)
	if (name.startsWith('...')) {
		rest = true
		name = name.slice(3)
	}	
	return {
		name,
		default: defaultValue,
		rest,
	}
}

module.exports = caching(getParameters)
