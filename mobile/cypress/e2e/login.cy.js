
describe('Login', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')
    cy.contains('p', 'Faça login com a sua conta').should('be.visible')
  })

  it('Deve logar como barbeiro', () => {
    const profissional = {
      matricula: '1003',
      senha: 'pwd123',
      nome: 'Tina'
    }

    cy.login(profissional)
    cy.verificarUsuarioLogado(profissional)
  })

  it('Não deve logar quando a senha é inválida', () => {
    const profissional = {
      matricula: '1008',
      senha: 'abc123',
    }

    cy.login(profissional)
    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')
  })

  it('Não deve logar quando a matrícula não existe', () => {
    const profissional = {
      matricula: '9999',
      senha: 'pwd123',
    }

    cy.login(profissional)
    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')
  })

  it('Não deve logar quando não são preenchidos', () => {
    cy.get('form').submit()
    cy.verificarToast('Informe sua matrícula e sua senha!')
  })
})