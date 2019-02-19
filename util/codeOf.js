/*
	codeOf(fn)

	Return the javascript body of the function `fn`.
*/
'use strict'
const compress = require('./compress-js')
const pipeline = require('./pipeline')

const rxFunctionBody = /^function[^)]*\(.*\)({.*)$/
const rxArrowBody = /^.*=>(.*)$/

function extractBody(code) {
	return (rxFunctionBody.exec(code) || rxArrowBody.exec(code))[1]
}

function trimLeading(prefix) {
	return js => {
		if (js.slice(0, prefix.length) === prefix)
			return js.slice(prefix.length)
		return js
	}
}

const hasBraces = code => code[0] === '{' && code[code.length - 1] === '}'

function stripSurroundingBraces(code) {
	if (hasBraces(code))
		return code.slice(1, -1)
	return code
}

function stripLeadingReturn(code) {
	code = code.replace(/^return\b ?/, '')
	if (!code) return 'return'
	return code
}

function codeOf(fn) {
	return pipeline(fn.toString(), [
		compress,
		extractBody,
		stripSurroundingBraces,
		stripLeadingReturn,
	])
}

module.exports = codeOf