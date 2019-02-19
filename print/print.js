'use strict'
const emitter = require('../lib/emitter')
const { singleRule, doubleRule } = require('./separator')
const colors = require('./colors')
const writeln = console.log
const { inspect } = require('util')

emitter.on('scenario', onScenario)
emitter.on('test', onTest)
emitter.on('result', onResult)
process.on('exit', printSummary)

let passedCount = 0, failedCount = 0, warningCount = 0
let currentScenario, sep

function onScenario(scenario) {
	currentScenario = scenario.scenario.join('\n')
	sep = singleRule(currentScenario)
}

function onTest(test) {
	countTest(test)
	if (!test.passed)
		printTest(test)
}

function countTest(test) {
	if (test.passed)
		++passedCount
	if (test.inconclusive)
		++warningCount
	if (test.failed)
		++failedCount
}

function printTest(test) {
	const description = test.test
	const outcome = describeOutcome(test)
	writeln(sep)
	writeln(currentScenario)
	writeln(description)
	writeln(outcome)
}

function describeOutcome(test) {
	if (test.passed)
		return colors.passed('Passed')
	if (test.inconclusive)
		return colors.warning('Inconclusive')
	if (test.threw)
		return `${colors.error('Error!')} threw ${inspect(test.threw)}`
	return `${colors.failed('Failed!')} returned ${inspect(test.returned)}`
}

function onResult(result) {
	if (result.tests === 0) {
		++warningCount
		printNoTestWarning()
	}
}

function printNoTestWarning() {
	writeln(sep)
	writeln(currentScenario)
	writeln(colors.warning('Warning: scenario has no tests'))
}

function printSummary() {
	const summary = summarize()
	const sep = doubleRule(summary)
	console.log(sep)
	console.log(summary)
}

function summarize() {
	let passed = `${passedCount} passed`,
		failed = `${failedCount} failed`,
		warnings = `${warningCount} warnings`

	if (failedCount + warningCount === 0) {
		if (passedCount === 0)
			passed = colors.warning(passed)
		else
			passed = colors.passed(passed)
	}

	if (failedCount > 0)
		failed = colors.failed(failed)

	const summary = [ passed, failed ]

	if (warningCount > 0) {
		warnings = colors.warning(warnings)
		summary.push(warnings)
	}

	return colors.bright('Test Summary: ') + summary.join(', ')
}
