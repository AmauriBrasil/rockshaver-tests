import calendario from '../fixtures/calendario.json' // Endpoint calendário
import agendamentos from '../fixtures/agendamentos.json' // Massa de teste fixa + calendario

describe('Agendamento', () => {

	beforeEach(() => {
		// Função para interceptar uma requisição http que é feita pelo navegador
		cy.intercept('GET', '**/api/calendario', {
			statusCode: 200,
			body: calendario
		}).as('getCalendario')
	})

	it('Deve realizar um novo agendamento', () => {
		// Massa de teste: sucesso
		const agendamento = agendamentos.sucesso

		// Pré Condição 1: Deleta o email da massa de teste cadastrado na collection do mongodb
		cy.deleteMany(
			{ emailCliente: agendamento.usuario.email },
			{ collection: 'agendamentos' }
		).then(result => {
			cy.log(result)
		})

		// Pré-condição 2: Realizar o pré-cadastro
		cy.preCadastroLS(agendamento.usuario)

		// Início do teste de sucesso
		cy.iniciarAgendamento()
		cy.escolherProfissional(agendamento.profissional.nome)
		cy.selecionarServico(agendamento.servico.descricao)
		cy.escolherDiaAgendamento(agendamento.dia)
		cy.escolherHorarioAgendamento(agendamento.hora)
		cy.finalizarAgendamento()

		cy.get('h3').should('be.visible')
			.and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
	})

	it('Deve mostrar o slot ocupado', () => {
		// Massa de teste: duplicado
		const agendamento = agendamentos.duplicado

		// Pré Condição 1: Deleta o email da massa de teste cadastrado na collection do mongodb
		cy.deleteMany(
			{ emailCliente: agendamento.usuario.email },
			{ collection: 'agendamentos' }
		).then(result => {
			cy.log(result)
		})

		// Pré-condição 2: Realiza o primeiro agendamento via API
		cy.agendamentoApi(agendamento)

		// Pré-condição 3: Realizar o pré-cadastro
		cy.preCadastroLS(agendamento.usuario)

		// Inicia o teste de agendamento duplicado
		cy.iniciarAgendamento()
		cy.escolherProfissional(agendamento.profissional.nome)
		cy.selecionarServico(agendamento.servico.descricao)
		cy.escolherDiaAgendamento(agendamento.dia)

		cy.get(`[slot="${agendamento.hora} - ocupado"]`)
			.should('be.visible')
			.find('svg')
			.should('be.visible')
			.and('have.css', 'color', 'rgb(255, 255, 255)')
	})

	it('Deve retornar uma notificação no caso de conflito de disponibilidade', () => {
		// Massa de teste: conflito
		const agendamento = agendamentos.conflito

		// Pré Condição 1: Deleta o email da massa de teste cadastrado na collection do mongodb
		cy.deleteMany(
			{ emailCliente: agendamento.usuario.email },
			{ collection: 'agendamentos' }
		).then(result => {
			cy.log(result)
		})

		// Pré-condição 2: Realizar o pré-cadastro
		cy.preCadastroLS(agendamento.usuario)

		// Pré-condição 3: Realizar um agendamento
		cy.iniciarAgendamento()
		cy.escolherProfissional(agendamento.profissional.nome)
		cy.selecionarServico(agendamento.servico.descricao)
		cy.escolherDiaAgendamento(agendamento.dia)
		cy.escolherHorarioAgendamento(agendamento.hora)

		// Realiza o agendamento via Api que simulará um segundo usuário para realizar o agendamento simultâneo...
		// ...com mesmo profissional, data e hora
		cy.agendamentoApi(agendamento)

		cy.finalizarAgendamento()

		cy.get('.alert-error')
			.should('be.visible')
			.and('have.text', 'Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
	})

	it('Deve recomeçar o agendamento', () => {
		// Massa de teste: sucesso
		const agendamento = agendamentos.sucesso

		// Pré-condição 1: Realizar o pré-cadastro
		cy.preCadastroLS(agendamento.usuario)

		cy.iniciarAgendamento()
		cy.escolherProfissional(agendamento.profissional.nome)

		cy.contains('a', 'Recomeçar').click()
	})
})
