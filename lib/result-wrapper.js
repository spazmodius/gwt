'use strict'

function Returned(_result) {
	return { returned: _result.returned }
}

function Threw(_result) {
	_result.checked = false

	return Object.create(null, {
		returned: {
			enumerable: true,
			get() {
				_result.checked = true
				throw _result.threw
			}
		},
		threw: {
			enumerable: true,
			get() {
				_result.checked = true
				return _result.threw
			}
		},
	})
}

module.exports = { Returned, Threw }
