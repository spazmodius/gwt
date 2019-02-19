'use strict'

module.exports = function* cartesian([ axis, ...axes ]) {
	if (!axis) 
		yield []
	else if (axes.length === 0)
		for (const value of axis)
			yield [ value ]
	else for (const value of axis)
		for (const vector of cartesian(axes))
			yield [value].concat(vector)
}
