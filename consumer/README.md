# Consumer App

Product Catalog website provides an interface to query the Product service for product information.

## Usage

1. cd into `consumer` dir

1. start the local web server

        $ docker-compose run --service-ports --rm consumer

1. open your browser and navigate to http://localhost:3000


### Run the test suite

1. Run all tests at once

        $ docker-compose run --rm consumer npm test

1. Run only unit tests

        $ docker-compose run --rm consumer npm run test:unit

1. Run only contract tests

        $ docker-compose run --rm consumer npm run test:pact
