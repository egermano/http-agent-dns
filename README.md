# http-agent-dns

This is a Node.js package with a customized HTTP and HTTPS agents to prevent SSRF with hosts validations with a possibility to use a custom DNS to prevent DNS rebinding. Another use of this package is creating a http-agent changing the DNS in some specifics requests in module or function level.

Minimum Node version required: `>=12.*`

## Install

TODO: after the package deployment

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

## Colaborations

## Code of Conduct

## License
