/// <reference types="Cypress" />

/**
 * @abstract:Learn the meaning of the word
 *
 * @criteria
  When viewing the learning page as a logged in user:
  - The app gets my next word to learn details from the server
  - I'm shown the word to learn
  - I'm shown my current total score
  - I'm shown the number of correct and incorrect guesses for that word
  - I'm presented an input to type my answer/guess for the current words translation
*/
describe(`User story: Presented with word`, function() {
  beforeEach(() => {
    cy.server()
      .route({
        method: 'GET',
        url: `/api/language/head`,
        status: 200,
        response: 'fixture:language-head.json',
      })
      .as('languageHeadRequest')
  })

  it('displays the current score', () => {
    cy.login()
      .visit(`/learn`)
      .wait('@languageHeadRequest')
    
    cy.fixture('language-head.json')
      .then(languageHeadFixture => {
        cy.get('main').within($main => {
          cy.get('label')
            .should('have.text', 'Your Guess: ')
        })
      })
  })

  it(`displays a form for submitting the next guess`, () => {
    cy.login()
      .visit(`/learn`)
      .wait('@languageHeadRequest')
    cy.get('form[id="User-Guess"]')
      .should('have.text', `Your Guess: Submit`)
    cy.get('form[id="User-Guess"]').within($form => {
      

      cy.get('input')
        .should('have.attr', 'type', 'text')

      cy.get('button[type=submit]')
        .should('have.text', 'Submit')
    })
  })

  it(`displays the correct and incorrect count for this word`, () => {
    
    cy.login()
      .visit(`/learn`)
      .wait('@languageHeadRequest')
    
    cy.fixture('language-head.json').then(languageHeadFixture => {
      cy.get('div[class="Word-Container"]').within($div => {
        cy.get('p[class="Correct-Count"]')
          .should(
            'contain',
            `Correct guesses: ${languageHeadFixture.wordCorrectCount}`,
          )
        cy.get('p[class="Incorrect-Count"]')
          .should(
            'contain',
            `Incorrect guesses: ${languageHeadFixture.wordIncorrectCount}`,
          )
      })
    })
  })
})
