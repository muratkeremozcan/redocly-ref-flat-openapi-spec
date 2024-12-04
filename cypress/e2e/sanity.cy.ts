import spok from 'cy-spok'
import 'cypress-ajv-schema-validator'
// import jsonSchema from '../../openapi.json' // normal
import jsonSchema from '../../bundled-openapi.json' // bundled
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

  const userShape = {
    id: spok.string,
    name: spok.string,
    email: spok.string,
    address: {
      street: spok.string,
      city: spok.string,
      state: spok.string,
      zip: spok.string
    }
  }

  it('should get all users and a single user', () => {
    cy.api({
      method: 'GET',
      url: '/users'
    })
      .validateSchema(jsonSchema, {
        endpoint: '/users',
        method: 'GET'
      })
      .its('body')
      .each(spok(userShape))

    cy.api({
      method: 'GET',
      url: '/users/1'
    })
      .validateSchema(jsonSchema, {
        endpoint: '/users/{userId}',
        method: 'GET'
      })
      .its('body')
      .should(spok(userShape))
  })
})
