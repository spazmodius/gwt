'use strict'

const theme = {
	passed: ['green', 'bold'],
	failed: ['red', 'bold'],
	warning: ['yellow', 'bold'],
	error: ['red', 'bold'],
	bright: ['white', 'bold'],
}
const styles = Object.keys(theme)
const descriptor = {}
const stub = { value: _ => _, enumerable: true }

try {
	const colors = require('colors/safe')
	colors.setTheme(theme)
	styles.forEach(style => descriptor[style] = { value: colors[style], enumerable: true })
}
catch (err) {
	if (err.code !== 'MODULE_NOT_FOUND')
		throw err
	styles.forEach(style => descriptor[style] = stub)
}

module.exports = Object.create(null, descriptor)
