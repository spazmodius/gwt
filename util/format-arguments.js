'use strict'
const getParameters = require('./getParameters')
const { inspect } = require('util')

function formatArguments( fn, args ) {
	const parms = getParameters(fn)
	return [..._formatArguments(args, parms)]
}

function* _formatArguments(args, parms) {
	let i = 0, parm
	while (i < args.length) {
		const arg = args[i]
		let value = inspect(arg)
		if (i < parms.length) {
			parm = parms[i]
			if (arg === undefined && parm.default)
				value = parm.default
			if (parm.rest) {
				value = '[' + value
				if (i === args.length)
					value += ']'
			}
			yield `${parm.name} = ${value}`
		}
		else {
			if (parm && parm.rest && i === args.length)
				value += ']'
			yield value
		}
		++i
	}
	while (i < parms.length) {
		parm = parms[i]
		if (parm.default)
		yield parm.default
		++i
	}
}

module.exports = formatArguments
