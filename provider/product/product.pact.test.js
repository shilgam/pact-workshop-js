const { Verifier } = require('@pact-foundation/pact');

jest.setTimeout(15000);

const gitCommitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString().trim();

const localGitBranch = require('child_process')
    .execSync('git rev-parse --abbrev-ref HEAD')
    .toString();

const gitBranch = process.env.TRAVIS_BRANCH || localGitBranch;

// Setup provider server to verify
const app = require('express')();
app.use(require('./product.routes'));

const providerBaseUrl = 'http://localhost:8080';
const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8081';
const logLevel = 'INFO';
const providerVersionTags = ['0.1.0', gitBranch];
const providerName = 'ProductService';
const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';

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
