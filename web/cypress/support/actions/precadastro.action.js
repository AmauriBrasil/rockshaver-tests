// INICIAR PRÉ-CADASTRO
Cypress.Commands.add('iniciarPreCadastro', (usuario) => {
	cy.visit('/')

	cy.get('header nav a[href="pre-cadastro"]')
		.click()

	cy.get('form h2')
		.should('be.visible')
		.and('have.text', 'Seus dados')

	cy.get('input[name="fullname"]').as('nome')
	cy.get('input[name="email"]').as('email')

	if (usuario?.nome) { // "?" Faça com que fica um valor opcional
		cy.get('@nome').type(usuario.nome)
	}

	if (usuario?.email) {
		cy.get('@email').type(usuario.email)
	}

	cy.contains('button[type="submit"]', 'Continuar')
		.click()
})

// VERIFICAR PRÉ-CADASTRO
Cypress.Commands.add('verificarPreCadastro', (usuario) => {
	cy.get('.usuario-nome')
		.should('be.visible')
		// Split é uma função que consegue dividir uma string em partes, criando um array de palavras através de uma condição que é passada como parâmetro dentro do argumento desta função
		.and('have.text', 'Olá, ' + usuario.nome.split(' ')[0])

	cy.get('.usuario-email')
		.should('be.visible')
		.and('have.text', usuario.email)

	// "Window" Função da janela que está aberta no contexto da execução da automação
	// "JSON.stringify" converte o objeto para uma string em JavaScript
	cy.window().then((win) => {
		const chaveUsuario = win.localStorage.getItem('usuario')
		expect(chaveUsuario).to.eql(JSON.stringify(usuario))
	})
})

// VALIDAR O PRÉ-CADASTRO VIA LOCAL STORAGE
Cypress.Commands.add('preCadastroLS', (usuario) => {
	cy.window().then((win) => {
		win.localStorage.setItem('usuario', JSON.stringify(usuario))

		cy.visit('/')
		cy.contains(usuario.email)
			.should('be.visible')
	})
})

// VERIFICAR ALERTA
Cypress.Commands.add('verificarAlerta', (campo, texto) => {
	cy.contains('label', campo)
		.parent()
		.find('.alert-msg')
		.should('be.visible')
		.and('have.text', texto)
})