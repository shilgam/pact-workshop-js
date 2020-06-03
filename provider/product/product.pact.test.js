import { Verifier } from '@pact-foundation/pact';
import { execSync } from 'child_process';
import express from 'express';
import Product from './product';
import controller from './product.controller';
import routes from './product.routes';


jest.setTimeout(15000);

const gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim();

const localGitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString();

const gitBranch = process.env.TRAVIS_BRANCH || localGitBranch;

// Setup provider server to verify
const app = express();
app.use(routes);

const providerBaseUrl = 'http://localhost:8080';
const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8081';
const logLevel = 'INFO';
const providerVersionTags = [gitBranch];
const providerName = 'ProductService';
const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';

// Setup stateHandlers
const stateHandlers = {
  'product with ID 10 exists': () => {
    controller.repository.products = new Map([
      ['10', new Product('10', 'CREDIT_CARD', '28 Degrees', 'v1')],
    ]);
  },
  'products exist': () => {
    controller.repository.products = new Map([
      ['09', new Product('09', 'CREDIT_CARD', 'Gem Visa', 'v1')],
      ['10', new Product('10', 'CREDIT_CARD', '28 Degrees', 'v1')],
    ]);
  },
  'no products exist': () => {
    controller.repository.products = new Map();
  },
  'product with ID 11 does not exist': () => {
    controller.repository.products = new Map();
  },
};

// confugure Verifier
let opts;
if (process.env.PACT_BROKER_TOKEN) {
  console.log('Fetch pacts from remote Pact Broker...');
  opts = {
    provider: providerName,
    providerBaseUrl,
    logLevel,
    providerVersion: gitCommitHash,
    providerVersionTags,
    publishVerificationResult: process.env.CI === 'true',
    pactBrokerUrl,
    stateHandlers,
    pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  };
} else {
  console.log('Fetch pacts from local Pact Broker...');
  opts = {
    provider: providerName,
    providerBaseUrl,
    logLevel,
    providerVersion: gitCommitHash,
    providerVersionTags,
    publishVerificationResult: process.env.CI === 'true',
    pactBrokerUrl,
    stateHandlers,
    pactBrokerUsername,
    pactBrokerPassword,
  };
}
let server;

describe('Pact Verification', () => {
  beforeAll(() => {
    server = app.listen('8080');
  });

  afterAll(() => {
    server.close();
  });

  it('validates the expectations of ProductService', async () => {
    console.log('opts: ');
    console.log(opts);
    const provider = new Verifier(opts);
    await provider.verifyProvider().then((output) => {
      console.log('Pact Verification Complete!');
      console.log(output);
    });
  });
});
