const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');


const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjNkZDM1MzhiLTBlYmItNGY2MS1iNmEyLTI5ODUxYTM3NGNkOS0xNzM2Nzk1MTExNzE5IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMzEyODI1MDYtZDZhZi00Mjk2LTliOTktYTIxNWQ2YjU1OWYzIiwidHlwZSI6InQifQ.fchL0s5PO6xyid-d0x8R3Jhsn6IS-KM-po7tz-4VRTk'
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