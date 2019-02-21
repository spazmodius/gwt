'use strict'
const when = require('..').when
const { randomBytes } = require('crypto')
const { Buffer } = require('buffer')

when(randomBytes, 99)
.then(({ returned }) => returned instanceof Buffer)
.then(({ returned }, [size]) => returned.length === size)
