'use strict'
const emitter = require('../lib/emitter')
const Logger = require('@spazmodius/logger')
const { inspect } = require('util')
const fastFields = Logger.stringify.fields.fast

const log = Logger(process.stdout)
const logScenario = log.child({ event: 'scenario' }, fastFields)
const logTest = log.child({ event: 'test' }, stringifyWithThrew)
const logResult = log.child({ event: 'result' }, stringifyWithThrew)

emitter.on('scenario', logScenario)
emitter.on('test', logTest)
emitter.on('result', logResult)

function stringifyWithThrew(obj) {
	if (obj.threw) {
		obj = { ...obj }
		obj.threw = inspect(obj.threw)
	}
	return fastFields(obj)
}
