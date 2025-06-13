describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
 })
 
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('aabcdefghijklmnopqrstuvwxyz', 10)
    
    cy.get('#firstName').type('Heitor')
    cy.get('#lastName').type('Ceschin')
    cy.get('#email').type('heitor@gmail.com')
    cy.get('#open-text-area').type(longText, { delay:0 } )
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
   cy.get('#firstName').type('Heitor')
   cy.get('#lastName').type('Ceschin')
   cy.get('#email').type('heitor@gmail,com')
   cy.get('#open-text-area').type("teste")
   cy.contains('button', 'Enviar').click()

   cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor nao numerico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
    
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Heitor')
    cy.get('#lastName').type('Ceschin')
    cy.get('#email').type('heitor@gmail,com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type("teste")
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it(' preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Heitor')
      .should('have.value', 'Heitor')
      .clear()
      .should('have.value', '')
    
    cy.get('#lastName')
      .type('ceschin')
      .should('have.value', 'ceschin')
      .clear()
      .should('have.value', '')
    
    cy.get('#email')
      .type('heitor@gmail.com')
      .should('have.value', 'heitor@gmail.com')
      .clear()
      .should('have.value', '')
    
    cy.get('#phone')
      .type('123455678')
      .should('have.value', '123455678')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
     cy.contains('button', 'Enviar').click()

  })
  
  it('envia o formulário com sucesso usando um comando customizado', () => {
     cy.fillMandatoryFieldsAndSubmit()
     
     cy.get('.success').should('be.visible')
   })
  
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto(Mentoria) por seu valor(value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  /* it.only('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .find('option')     // pega todas as opções
      .eq(1)              // índice 1 (segunda opção)
      .then($option => {
        const val = $option.attr('value')
        cy.get('#product')
          .select(val)
          .should('have.value', val)
          })  */
  }) 
  
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(type0fService => {
        cy.wrap(type0fService)
          .check()
          .should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

   it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
     cy.contains('a', 'Política de Privacidade')
       .invoke('removeAttr', 'target')
       .click()
     
     cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
  
  it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
      .contains('p', 'Talking About Testing')
      .should('be.visible')
  })
})