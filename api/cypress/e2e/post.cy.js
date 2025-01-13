describe('POST /api/agendamentos', () => {

  it('Deve criar um novo agendamento', () => {
    // Massa de teste
    const body = {
      "emailCliente": "amauri@teste.com",
      "nomeCliente": "Amauri Suba",
      "data": "20/01/2025",
      "hora": "14:00",
      "matricula": "1001",
      "codigoServico": "1"
    }

    // Pré Condição 1: Deletar o email da massa de teste cadastrado na collection do mongodb
    cy.deleteMany(
      { matricula: body.matricula },
      { collection: 'agendamentos' }
    )

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Agendamento criado com sucesso')
      // Expressão regular para validação do identificador "agendamentoId" do mongodb do teste de cadastro do agendamento
      expect(response.body.agendamentoId).to.match(/^[a-fA-F0-9]{24}$/)
    })
  })

  it('Deve retornar erro quando o agendamento já existir', () => {
    const body = {
      "emailCliente": "test@teste.com",
      "nomeCliente": "Amauri Test",
      "data": "20/01/2025",
      "hora": "14:00",
      "matricula": "1002",
      "codigoServico": "2"
    }

    cy.deleteMany(
      { matricula: body.matricula },
      { collection: 'agendamentos' }
    )

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.message).to.eq('Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
    })
  })

  it('Deve retornar erro quando o email for inválido', () => {
    const body = {
      "emailCliente": "test.teste.com",
      "nomeCliente": "Amauri Test",
      "data": "20/01/2025",
      "hora": "14:00",
      "matricula": "1002",
      "codigoServico": "2"
    }

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('O campo emailCliente deve conter um email válido.')
    })
  })

  it('Deve retornar erro quando o funcionário não existir', () => {
    const body = {
      "emailCliente": "test@teste.com",
      "nomeCliente": "Amauri Test",
      "data": "20/01/2025",
      "hora": "14:00",
      "matricula": "1999",
      "codigoServico": "3"
    }

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.error).to.eq('Funcionário não encontrado.')
    })
  })

  it('Deve retornar erro quando o código de serviço não existir', () => {
    const body = {
      "emailCliente": "test@teste.com",
      "nomeCliente": "Andrea Test",
      "data": "19/01/2025",
      "hora": "16:00",
      "matricula": "1007",
      "codigoServico": "10"
    }

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.error).to.eq('Serviço não encontrado para o código fornecido.')
    })
  })

  context('Campos obrigatórios', () => {
    const camposObrigatorios = [
      { campo: 'emailCliente', message: 'O campo emailCliente é obrigatório.' },
      { campo: 'nomeCliente', message: 'O campo nomeCliente é obrigatório.' },
      { campo: 'data', message: 'O campo data é obrigatório.' },
      { campo: 'hora', message: 'O campo hora é obrigatório.' },
      { campo: 'matricula', message: 'O campo matricula é obrigatório.' },
      { campo: 'codigoServico', message: 'O campo codigoServico é obrigatório.' }
    ]

    camposObrigatorios.forEach((x) => {
      it(`Deve retornar erro quando o ${x.campo} for obrigatório`, () => {
        const body = {
          "emailCliente": 'andrea@teste.com',
          "nomeCliente": "Andrea Test",
          "data": "19/01/2025",
          "hora": "16:00",
          "matricula": "1007",
          "codigoServico": "10"
        }

        delete body[x.campo]

        cy.postAgendamento(body).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.eq(x.message)
        })
      })
    })
  })
})
