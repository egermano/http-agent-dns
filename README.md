# http-agent-dns

This is a Node.js package with a customized HTTP and HTTPS agents to prevent SSRF with hosts validations with a possibility to use a custom DNS to prevent DNS rebinding. Another use of this package is creating a http-agent changing the DNS in some specifics requests in module or function level.

Inspired by [ssrf-agent](https://github.com/welefen/ssrf-agent).

Minimum Node version required: `>=12.*`

## Install

### From NPM

`//TODO: deploy the package in npm official repository`

### From Github Registry

In order to install the package from Github Registry, you need to setup your npm to use the Github Registry.

```bash
$ npm login --scope=@egermano --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

For more information, please visit [Working with Github Packages Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

Install the package:

```bash
npm add @egermano/http-agent-dns
```

## Usage

### Axios example

```javascript
const httpAgent = require('http-agent');
const axios - require('axios');

const url = 'https://egermano.com';

const response = await axios.get(url, {
    httpAgent: httpAgent(url),
    httpsAgent: httpAgent(url),
});
```

**With custom DNS**

```javascript
const httpAgent = require('http-agent');
const axios - require('axios');

const url = 'https://egermano.com';
const options = {
    dnsServers: ['8.8.8.8', '1.1.1.1'],
};

const response = await axios.get(url, {
    httpAgent: httpAgent(url, options),
    httpsAgent: httpAgent(url, options),
});
```

### request example

warning: request package was deprecated, but this example works.

```javascript
const httpAgent = require('http-agent');
const request - require('request');

const url = 'https://egermano.com';

request.get({
    url,
    agent: httpAgent(url),
    (error, response) => {
        // do something
    }
});
```

**With custom DNS**

```javascript
const httpAgent = require('http-agent');
const request - require('request');

const url = 'https://egermano.com';
const options = {
    dnsServers: ['8.8.8.8', '1.1.1.1'],
};

request.get({
    url,
    agent: httpAgent(url, options),
    (error, response) => {
        // do something
    }
});
```

## Other documentations

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Collaboration and Contributing](CONTRIBUTING.md)
- Changes: [CHANGELOG.md](CHANGELOG.md)
- License: [GNU General Public License v3.0](LICENSE)
