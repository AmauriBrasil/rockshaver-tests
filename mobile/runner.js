const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');


const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjNkZDM1MzhiLTBlYmItNGY2MS1iNmEyLTI5ODUxYTM3NGNkOS0xNzM2Nzk1NTkwOTg3IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiZWE2ZDQyOTAtMzA5Zi00OThjLThjZWYtNjYzYTQxODg3NWEyIiwidHlwZSI6InQifQ.LMH0QT-3rtjjYljDUSnZMDI0_bcCuB8WHOjuXLjaJlQ'
cypress.run({
	// specs to run here
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