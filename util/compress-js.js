'use strict'

const PUNC = new Set('!"$%&\'()*+,-./:;<=>?[]^`{|}~')
const isPunc = c => PUNC.has(c)

const EMPTY = ''
const SPACE = ' '

function elide(ws, at, text) {
	if (at === 0 || isPunc(text[at - 1]))
		return EMPTY
	const after = at + ws.length
	if (after >= text.length || isPunc(text[after]))
		return EMPTY
	return SPACE
}

function compressJs(js) {
	return js.replace(/\s+/g, elide)
}

module.exports = compressJs
