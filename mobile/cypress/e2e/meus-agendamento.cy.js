import { profissional, agendamentos } from '../fixtures/agendamentos.json'

describe('Meus Agendamentos', () => {

	before(() => { // Será executado uma única vez para todos os testes
		cy.criarAgendamentosApi(profissional, agendamentos)
	})

	beforeEach(() => {	// Será executado uma vez antes de cada teste
		// Realiza as pré-condições de login
		cy.viewport('iphone-xr')
		cy.visit('/')
		cy.contains('p', 'Faça login com a sua conta').should('be.visible')
		cy.login(profissional)
		cy.verificarUsuarioLogado(profissional)
	})

	it('Deve exibir os meus agendamentos', () => {
		cy.get('ul li').should('be.visible') // Valida a lista de todos os agendamentos
			.and('have.length', agendamentos.length) // Conta a quantidade de itens que contém na massa de teste
			.each(($li, index) => { // Sub-função igual o forEach para percorrer um agendamento por vez

				const agendamento = agendamentos[index]
				const resultado = `${agendamento.servico.descricao} no dia ${agendamento.data} às ${agendamento.hora}`

				cy.wrap($li)
					.invoke('text') // Pega a propriedade de texto de cada elemento (massa)
					.should('contain', agendamento.usuario.nome) // Verifica se o nome de cada um está correto
					.and('contain', resultado) // Valida a descrição de cada agendamento
			})
	})

	it('Deve cancelar um agendamento', () => {
		// Vai buscar dentro do array de massa apenas o registro que tem o email igual ao "peter@stark.com"
		const agendamento = agendamentos.find(x => x.usuario.email === 'peter@stark.com')

		cy.contains('ul li', agendamento.usuario.nome)
			.as('agendamentoItem')

		cy.get('@agendamentoItem')
			.should('be.visible')
			.click()

		cy.contains('span', 'Cancelar agendamento')
			.should('be.visible')
			.click()

		cy.verificarToast('Agendamento cancelado com sucesso!')

		cy.get('@agendamentoItem')
			.should('not.exist')
	})

	it('Deve enviar uma solicitação de lembrete', () => {
		const agendamento = agendamentos.find(x => x.usuario.email === 'bruce@avengers.com')

		cy.contains('ul li', agendamento.usuario.nome)
			.as('agendamentoItem')

		cy.get('@agendamentoItem')
			.should('be.visible')
			.click()

		cy.contains('span', 'Enviar lembrete por e-mail')
			.should('be.visible')
			.click()

		cy.verificarToast('Lembrete enviado com sucesso!')
	})
})
