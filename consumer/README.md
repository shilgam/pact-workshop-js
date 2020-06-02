# Consumer App

[![FrontendWebsite/ProductService Pact Status](https://telegacom.pact.dius.com.au/pacts/provider/ProductService/consumer/FrontendWebsite/latest/badge.svg?label=provider)](https://telegacom.pact.dius.com.au/pacts/provider/ProductService/consumer/FrontendWebsite/latest) (latest pact)

[![FrontendWebsite/ProductService Pact Status](https://telegacom.pact.dius.com.au/matrix/provider/ProductService/latest/master/consumer/FrontendWebsite/latest/master/badge.svg?label=provider)](https://telegacom.pact.dius.com.au/pacts/provider/ProductService/consumer/FrontendWebsite/latest/master) (master/master pact)

Product Catalog website provides an interface to query the Product service for product information.

## Usage

1. cd into project's root dir

1. start only consumer app:

        $ make start_consumer

1. open your browser and navigate to http://localhost:3000


### Run the test suite

1. run all tests at once

        $ make consumer_test

1. run only unit tests

        $ make consumer_test_unit

1. run only contract tests

        $ make consumer_test_contract


### Generate and publish contract files to Pact Broker

1. generate contract file and publish to Pact Broker

        $ make consumer_publish_pact
