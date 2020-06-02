const pact = require('@pact-foundation/pact-node');
const path = require('path');


if (!process.env.CI && !process.env.PUBLISH_PACT) {
    console.log('skipping Pact publish...');
    return
}

const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8081';
const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;
const pactFilesOrDirs = [path.resolve(__dirname, './pacts/')];
const gitCommitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString().trim();

const localGitBranch = require('child_process')
    .execSync('git rev-parse --abbrev-ref HEAD')
    .toString();

const providerBaseUrl = 'http://localhost:8080';

const gitBranch = process.env.TRAVIS_BRANCH || localGitBranch;

let opts;
if (process.env.PACT_BROKER_TOKEN) {
    console.log('Publishing contract to remote Pact Broker...');
    opts = {
        providerBaseUrl,
        pactFilesOrDirs,
        pactBroker: pactBrokerUrl,
        tags: [gitBranch],
        consumerVersion: gitCommitHash,
        pactBrokerToken,
    };
} else {
    console.log('Publishing contract to local Pact Broker...');
    opts = {
        providerBaseUrl,
        pactFilesOrDirs,
        pactBroker: pactBrokerUrl,
        tags: [gitBranch],
        consumerVersion: gitCommitHash,
        pactBrokerUsername,
        pactBrokerPassword,
    };
}

console.log('>>>>> opts:');
console.log(opts);

pact
    .publishPacts(opts)
    .then(() => {
        console.log('Pact contract publishing complete!');
        console.log('');
        console.log(`Head over to ${pactBrokerUrl} and login with`);
        console.log(`=> Username: ${pactBrokerUsername}`);
        console.log(`=> Password: ${pactBrokerPassword}`);
        console.log('to see your published contracts.');
    })
    .catch((e) => {
        console.log('Pact contract publishing failed: ', e);
    });
