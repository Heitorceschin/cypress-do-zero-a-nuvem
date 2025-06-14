# Cypress, from zero to the Cloud
> This project uses Cypress to perform end-to-end (E2E) testing on a front-end application. We implemented comprehensive test coverage across the entire application to ensure functionality and reliability.
## Pre-requirements

It is required to have git, Node.js and npm installed to clone and run this project.

> I've used versions `2.42.1`, `v20.13.1` and `10.8.1` of git, Node.js and npm, respectively. I suggest you use the same or later LTS versions.

## Installation
* Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests
In this project, you can run the tests on a desktop or mobile viewport.

## Desktop
* Run `npm test` (or npm t for the short version) to run the test in headless mode on a desktop viewport.

Or, `run npm run cy:open` to open the Cypress App on a desktop viewport.

# Mobile
* Run `npm run test:mobile` to run the test in headless mode on a mobile viewport.

Or, `run npm run cy:open:mobile` to open the Cypress App on a mobile viewport.