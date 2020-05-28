# Provider App

Product Service (Provider) provides useful things about products, such as listing all products and getting the details of an individual product.

## Usage

1. cd into `provider` dir

1. start the local web server

        $ docker-compose run --service-ports --rm provider

1. make a request to the endpoint
        $ curl http://localhost:8080/products

### Run the test suite

1. Run contract tests

        $ docker-compose run --rm provider npm run test:pact
