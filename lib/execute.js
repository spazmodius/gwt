'use strict'
const emit = require('./emit')
const { Returned, Threw } = require('./result-wrapper')
const sequential = require('../util/sequential')

async function execute(scenario) {
	const { givens, when, thens } = scenario

	const inputs = []
	for (const given of givens) {
		const context = await given.exec()
		inputs.push(...context)
	}

	inputs.push(...when.extra)
	emit.scenario(givens, when, inputs)

	const _result = {
		tests: 0,
		passed: 0,
		inconclusive: 0,
		failed: 0,
	}

	let result
	try {
		_result.returned = await when.action(...inputs)
		result = Returned(_result)
	}
	catch (error) {
		_result.threw = error
		result = Threw(_result)
	}

	for (const then of thens) {
		const outcome = {}
		try {
			++_result.tests
			outcome.returned = await then.expectation( result, inputs, ...then.extra )
			if (outcome.returned === true) {
				outcome.passed = true
				++_result.passed
			}
			else if (outcome.returned === undefined) {
				outcome.inconclusive = true
				++_result.inconclusive
			}
			else {
				outcome.failed = true
				++_result.failed
			}
		}
		catch (error) {
			outcome.threw = error
			outcome.failed = true
			++_result.failed
		}

		emit.test(then, outcome)
	}

	emit.result(_result)
}

module.exports = sequential(execute)
