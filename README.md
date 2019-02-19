# Spaz's Given-When-Then

***Super simple Given-When-Then tests in Node.js***

## Install and Usage

`npm install spazmodius/gwt`

```js
const given = require('@spazmodius/gwt')
const crypto = require('crypto')
const { Buffer } = require('buffer')

given(5)
.when(crypto.randomBytes)
.then(({ returned }) => returned instanceof Buffer)
.then(({ returned }) => returned.length === 5)
```