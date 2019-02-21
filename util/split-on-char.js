'use strict'
const assert = require('./assert')

const OPEN_PAREN = 40, OPEN_BRACKET = 91, OPEN_BRACE = 123
const CLOSE_PAREN = 41, CLOSE_BRACKET = 93, CLOSE_BRACE = 125

function splitOnChar(splitChar, text) {
	assert.isString(text)
	const splitter = splitChar.charCodeAt(0), output = []
	if (text) {
		const len = text.length
		let p = 0, nest = 0, point
		for (let q = 0; q < len; ++q) {
			point = text.charCodeAt(q)
			switch (point) {
				case splitter:
					if (nest === 0) {
						output.push(text.slice(p, q))
						p = q + 1
					}
					break
				case OPEN_PAREN:
				case OPEN_BRACKET:
				case OPEN_BRACE:
					++nest
					break
				case CLOSE_PAREN:
				case CLOSE_BRACKET:
				case CLOSE_BRACE:
					--nest
					break
			}
		}
		assert.equal(nest, 0)
		output.push(text.slice(p, text.length))
	}
	return output
}

module.exports = splitOnChar
