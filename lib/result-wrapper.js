'use strict'

function ResultWrapper(_inner) {
	this._inner = _inner
}

Object.defineProperties(ResultWrapper.prototype, {
	returned: {
		enumerable: true,
		get() {
			if (this._inner.threw) {
				this._inner.checked = true
				throw this._inner.threw
			}
			return this._inner.returned
		}
	},
	threw: {
		enumerable: true,
		get() {
			if (this._inner.threw)
				this._inner.checked = true
			return this._inner.threw
		}
	},
})

module.exports = ResultWrapper
