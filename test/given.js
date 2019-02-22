'use strict'
const _given = require('../lib/_given')
const assert = require('@spazmodius/assert')

let count = 0

function given(...args) {
	++count
	return { resolves: (description, values) => {
		const g = _given(...args)
		assert.equal(g.description, description, undefined, ...args)
		g.exec().then(resolvedValues => assert.deepEqual(resolvedValues, values, undefined, ...args))
	}}
}

function fn() { return arguments.length }
function fp() { return Promise.resolve(arguments.length) }

// 0
given().resolves(undefined, [])

// 1 & 2
;[2, [], null].forEach(value0 => {
	// 1
	given(value0).resolves(undefined, [ value0 ])

	;[3, [], null, 'c', fn].forEach(value1 => {
		// 2a
		given(value0, value1).resolves(undefined, [ value0, value1 ])

		;[4, [], null, 'd', fn, undefined].forEach(value2 => {
			// 2b
			given(value0, value1, value2).resolves(undefined, [ value0, value1, value2 ])
		})
	})
})

// 3
;[fn, fp].forEach(f => {
	given(f).resolves(undefined, [0])
	;[5, [], null, 'e', f, undefined].forEach(arg0 => {
		// 4a
		given(f, arg0).resolves(undefined, [ 1 ])

		;[6, [], null, 'f', f, undefined].forEach(arg1 => {
			// 4b
			given(f, arg0, arg1).resolves(undefined, [ 2 ])
		})
	})
})

// 5 & 6
;['g', undefined].forEach(description => {
	// 5
	given(description).resolves(description, [])

	;[8, [], null, 'h'].forEach(value0 => {
		// 6a
		given(description, value0).resolves(description, [ value0 ])

		;[9, [], null, 'i', fn, undefined].forEach(value1 => {
			// 6b
			given(description, value0, value1).resolves(description, [ value0, value1 ])
		})
	})
})

// 7
;['j', undefined].forEach(description => {
	// 7a
	[fn, fp].forEach(f => {
		given(description, f).resolves(description, [ 0 ])

		;[11, [], null, 'k', f, undefined].forEach(value0 => {
			// 7b
			given(description, f, value0).resolves(description, [ 1 ])
			given(description, undefined, value0).resolves(description, [ value0 ])
		})
	})
})

console.log(count, 'Tests Passed')
