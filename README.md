# Sample repo to show `redocly cli` flattening the nested OpenAPI spec and free OpenAPI docs on GitHub Pages

[![API Documentation](https://img.shields.io/badge/API-DOCUMENTATION-blue?style=flat-square)](https://muratkeremozcan.github.io/redocly-ref-flat-openapi-spec/api-docs.html)

A demo of `redocly cli` flattening the nested OpenAPI spec.

## Setup

```bash
npm i
```

### Scripts

```bash
# bundles the openapi spec, optionally updates the version (pass it in as a 3rd argument in package.json script)
npm run bundle:openapi

npm run lint
npm run typecheck
npm run fix:format
npm run validate # all the above in parallel

npm run test # unit tests
npm run test:watch # watch mode

npm run mock:server # starts the mock backend/provider server

npm run cy:open-local # open mode
npm run cy:run-local  # run mode
npm run cy:run-local-fast  # no video or screen shots
```
