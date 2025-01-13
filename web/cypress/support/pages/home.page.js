import header from './components/header'

// PADRÃO PAGE OBJECTS
class HomePage {

	constructor() {
		this.header = header
	}

	go() {
		cy.visit('/')
	}
}

export default new HomePage()