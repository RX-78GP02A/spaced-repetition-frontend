/// <reference types="Cypress" />

/**
 * @abstract:See button for next word
 *
 * @criteria
  When viewing feedback for an answer on the learning page as a logged in user:
  - I'm presented with a button that I can click to learn another word
  - When clicking on the button I see the next word to learn
*/
describe(`User story: Go to next word`, function() {
  beforeEach(() => {
    cy.server()
      .route({
        method: 'GET',
        url: `/api/language/head`,
        status: 200,
        response: 'fixture:language-head.json',
      })
      .as('languageHeadRequest')
      .route({
        method: 'POST',
        url: `/api/language/guess`,
        status: 200,
        response: 'fixture:language-guess-generic.json',
      })
      .as('postListGuess')

    cy.login().visit(`/learn`).wait('@languageHeadRequest')
    cy.get('input').type('anything')
    cy.get('form').submit().wait('@postListGuess')
  })

  it(`displays another word after clicking the 'next' button`, () => {
    cy.get('button[class="next stylish-btn"]').click()

    cy.fixture('language-guess-generic.json')
      .then(languageHeadFixture => {
        cy.get('main').within($main => {
          cy.get('p').eq(0)
            .should(
              'have.text',
              `Correct guesses: ${languageHeadFixture.wordCorrectCount}`,
            )
          cy.get('form[id="User-Guess"]')
            .should('have.text', 'Your Guess: Submit')
        })
      })

    cy.get('main form').within($form => {

      cy.get('input')
        .should('have.attr', 'type', 'text')

      cy.get('button[type=submit]')
        .should('have.text', 'Submit')
    })
  })
})
