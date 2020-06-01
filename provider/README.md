# Provider App

Product Service (Provider) provides useful things about products, such as listing all products and getting the details of an individual product.

## Usage

1. cd into project's root dir

1. start the local web server

        $ make start_provider

1. make a request to the endpoint
        $ curl http://localhost:8080/products


### Verify contracts

1. verify contracts on Provider and publish results to the Broker

        $ make provider_verify_pact
