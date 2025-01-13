// Iniciar o agendamento
Cypress.Commands.add('iniciarAgendamento', () => {
	cy.contains('a', 'Agendar um horário').click()
})

// Escolher o profissional
Cypress.Commands.add('escolherProfissional', (profissional) => {
	cy.contains('span', 'Membros da Equipe').should('be.visible')
	cy.contains('div', profissional).parent().click()
})

// Selecionar o serviço
Cypress.Commands.add('selecionarServico', (servico) => {
	cy.contains('span', 'Serviços').should('be.visible')
	cy.contains('div', servico).parent().click()
})

// Escolher o dia do agendamento
Cypress.Commands.add('escolherDiaAgendamento', (dia) => {
	cy.contains('span', 'Dias Disponíveis').should('be.visible')
	cy.contains('.dia-semana', dia).click()
})

// Escolher o horário do agendamento
Cypress.Commands.add('escolherHorarioAgendamento', (hora) => {
	cy.contains('span', 'Horários Disponíveis').should('be.visible')
	cy.contains('.hora-opcao', hora).click()
})

// Finalizar o agendamento
Cypress.Commands.add('finalizarAgendamento', () => {
	cy.contains('button', 'Confirmar e reservar').click()
})
