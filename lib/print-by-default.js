'use strict'
const emitter = require('./emitter')
if (emitter.listenerCount('test') === 0)
	require('../print/print')
