# local development

build:
	docker-compose -f consumer/docker-compose.yml -f provider/docker-compose.yml build

start:
	docker-compose -f consumer/docker-compose.yml -f consumer/docker-compose.override.yml -f provider/docker-compose.yml -f provider/docker-compose.override.yml up

start_consumer:
	docker-compose -f consumer/docker-compose.yml -f consumer/docker-compose.override.yml run --service-ports --rm consumer

start_provider:
	docker-compose -f provider/docker-compose.yml -f provider/docker-compose.override.yml run --service-ports --rm provider

consumer_test:
	docker-compose -f consumer/docker-compose.yml -f consumer/docker-compose.override.yml run --rm consumer npm test

consumer_test_unit:
	docker-compose -f consumer/docker-compose.yml -f consumer/docker-compose.override.yml run --rm consumer npm run test:unit

consumer_test_contract:
	docker-compose -f consumer/docker-compose.yml -f consumer/docker-compose.override.yml run --rm consumer npm run test:pact


consumer_publish_pact:
	docker-compose -f consumer/docker-compose.yml -f consumer/docker-compose.override.yml -f consumer/docker-compose.publish.yml run --rm consumer sh -c "npm run test:pact && CI=true npm rum posttest:pact"

provider_verify_pact:
	docker-compose -f provider/docker-compose.yml -f provider/docker-compose.override.yml -f provider/docker-compose.verify.yml run --rm provider sh -c "npm run test:pact"

# ci

consumer_test_unit_ci:
	docker-compose -f consumer/docker-compose.yml run --rm consumer npm run test:unit

consumer_test_contract_ci:
	docker-compose -f consumer/docker-compose.yml run --rm consumer npm run test:pact

consumer_publish_pact_ci:
	docker-compose -f consumer/docker-compose.yml -f consumer/docker-compose.publish.yml run --rm consumer sh -c "npm run test:pact && CI=true npm run posttest:pact"

provider_verify_pact_ci:
	docker-compose -f provider/docker-compose.yml -f provider/docker-compose.verify.yml run --rm provider  sh -c "npm run test:pact"
