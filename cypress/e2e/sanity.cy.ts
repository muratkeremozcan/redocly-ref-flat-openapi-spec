import { retryableBefore } from '../support/retryable-before'

describe('CRUD movie', () => {
  retryableBefore(() => {
    cy.api({
      method: 'GET',
      url: '/'
    })
      .its('body.message')
      .should('eq', 'Server is running')
  })

  it('should', () => {
    cy.log('say hello')
  })
})
