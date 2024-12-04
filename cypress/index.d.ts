export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** https://www.npmjs.com/package/@cypress/skip-test
       * `cy.skipOn('localhost')` */
      skipOn(
        nameOrFlag: string | boolean | (() => boolean),
        cb?: () => void
      ): Chainable<Subject>

      /** https://www.npmjs.com/package/@cypress/skip-test
       * `cy.onlyOn('localhost')` */
      onlyOn(
        nameOrFlag: string | boolean | (() => boolean),
        cb?: () => void
      ): Chainable<Subject>

      /**
       * Validates the response body against the provided schema.
       *
       * @param schema - OpenAPI schema object to validate against.
       * @param options - Endpoint and method information for the schema, with optional path and status.
       *
       * @example
       * ```js
       * cy.validateSchema(schema, {
       *   endpoint: '/movies',
       *   method: 'POST'
       * })
       * ```
       *
       * You can optionally specify `path` and `status`:
       *
       * @example
       * ```js
       * cy.validateSchema(schema, {
       *   endpoint: '/movies',
       *   method: 'POST',
       *   status: 201 // Defaults to 200 if not provided
       * })
       * ``` */
      validateSchema(
        schema: OpenAPIV3_1.Document,
        options: {
          path?: string
          endpoint: string
          method: string
          status?: string | number
        }
      ): Chainable<Subject>
    }
  }
}
