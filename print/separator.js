'use strict'

const HLINE = '\u2500', DBL_HLINE = '\u2550'

const separator = (c, text) => c.repeat(firstLineLength(text))

function firstLineLength(text) {
	let i = text.indexOf('\n')
	if (i === 0)
		i = text.indexOf('\n', i+1)
	if (i < 0)
		i = text.length
	return i
}

module.exports = {
	singleRule: separator.bind(null, HLINE),
	doubleRule: separator.bind(null, DBL_HLINE),
}
