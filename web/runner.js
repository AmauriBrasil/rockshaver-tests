const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');


const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjNkZDM1MzhiLTBlYmItNGY2MS1iNmEyLTI5ODUxYTM3NGNkOS0xNzM2Nzk1ODI0MjczIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiN2E1ZmNlNGYtOWIwMS00ODQ3LTgzZmEtNzhmMWZlOWVhZWY3IiwidHlwZSI6InQifQ.FJIE7KS__SgNpjpHtf84vaLtz5c29AW7HOWGVJXN1ms'
cypress.run({
	// specs to run here
	browser: 'chrome'
})
	.then((results) => {
		const args = {
			target: 'TOKEN',
		}
		tesults.results(results, args);
	})
	.catch((err) => {
		console.error(err)
	})