
describe('Pré-Cadastro', () => {
  it('Deve realizar o pré-cadastro do cliente', () => {
    // Massa de teste
    const usuario = { // Constantes são imutáveis, não pode ser alterado o valor definido
      nome: 'Amauri Brasil',
      email: 'brasil@msn.com'
    }

    cy.iniciarPreCadastro(usuario)
    cy.verificarPreCadastro(usuario)
  })

  it('Deve validar os campos obrigatórios', () => {
    cy.iniciarPreCadastro()
    cy.verificarAlerta('Nome Completo', 'O campo nome é obrigatório.')
    cy.verificarAlerta('E-mail', 'O campo e-mail é obrigatório.')
  })

  it('Não deve fazer o pré-cadastro apenas com o primeiro nome', () => {
    const usuario = {
      nome: 'Amauri',
      email: 'brasil@msn.com'
    }

    cy.iniciarPreCadastro(usuario)
    cy.verificarAlerta('Nome Completo', 'Informe seu nome completo.')
  })

  it('Não deve fazer o pré-cadastro email inválido', () => {
    const usuario = {
      nome: 'Amauri Brasil',
      email: 'www.brasil.com'
    }

    cy.iniciarPreCadastro(usuario)
    cy.verificarAlerta('E-mail', 'O e-mail inserido é inválido.')
  })

  it('Deve cancelar o pré cadastro', () => {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]')
      .click()

    cy.get('form h2')
      .should('be.visible')
      .and('have.text', 'Seus dados')

    cy.contains('button[type="button"]', 'Cancelar')
      .click()
  })
})