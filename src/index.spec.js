const axios = require('axios');
const { describe, expect, it } = require('@jest/globals');
const httpAgent = require('./index');

const blocked = [
    'http://127.0.0.1:80',
    'http://127.0.0.1:443',
    'http://127.0.0.1:22',
    'http://0.0.0.0:80',
    'http://0.0.0.0:443',
    'http://0.0.0.0:22',
    'http://localhost:80',
    'http://localhost:443',
    'http://localhost:22',
    'http://[::]:80',
    'http://[::]:25',
    'http://[::]:22',
    'http://0000::1:80',
    'http://0000::1:25',
    'http://0000::1:22',
    'http://0000::1:3128',
    'http://customer1.app.localhost.my.company.127.0.0.1.nip.io',
    'http://bugbounty.dod.network',
    'http://spoofed.burpcollaborator.net',
    'http://127.127.127.127',
    'http://127.0.1.3',
    'http://127.0.0.0',
    'http://0177.0.0.1',
    'http://2130706433',
    'http://3232235521',
    'http://3232235777',
    'http://[0:0:0:0:0:ffff:127.0.0.1]',
    'http://0',
    'http://127.1',
    'http://127.0.1',
    'http://127.1.1.1:80@127.2.2.2:80',
    'http://127.1.1.1:80@@127.2.2.2:80',
    'http://127.1.1.1:80:@@127.2.2.2:80',
    'http://127.1.1.1:80#@127.2.2.2:80',
    'http://169.254.169.254',
    'http://425.510.425.510',
    'http://2852039166',
    'http://7147006462',
    'http://0xA9.0xFE.0xA9.0xFE',
    'http://0xA9FEA9FE',
    'http://0x41414141A9FEA9FE',
    'http://0251.0376.0251.0376',
    'http://0251.00376.000251.0000376',
    'http://169.254.169.254/latest/meta-data/hostname',
    'https://A.127.0.0.1.1time.10.0.0.1.1time.repeat.8f058b82-4c39-4dfe-91f7-9b07bcd7fbd5.rebind.network',
    'https://[::]:22',
    'https://[::]:25',
    'https://[::]:80',
    'http://[0:0:0:0:0:ffff:127.0.0.1]',
    'https://0.0.0.0:22',
    'https://0.0.0.0:443',
    'https://0.0.0.0:80',
    'http://425.510.425.510',
    'http://mail.ebc.apple.com',
    'http://metadata.nicob.net',
    'http://0177.0.0.1',
    'http://127.0.0.0',
    'http://127.0.1.3',
    'http://127.1.1.1:80:@@127.2.2.2:80',
    'http://127.1.1.1:80@@127.2.2.2:80',
    'http://127.1.1.1:80@127.2.2.2:80',
    'http://127.1.1.1:80#@127.2.2.2:80',
    'http://127.127.127.127',
    'http://169.254.169.254',
    'http://169.254.169.254/latest/meta-data/hostname',
    'http://0',
    'http://0000::1:22',
    'http://0000::1:25',
    'http://0000::1:3128',
    'http://0000::1:80',
    'http://0251.00376.000251.0000376',
    'http://0251.0376.0251.0376',
    'http://0x41414141A9FEA9FE',
    'http://0xA9.0xFE.0xA9.0xFE',
    'http://0xA9FEA9FE',
    'http://127.0.1',
    'http://127.1',
    'http://2130706433',
    'http://2852039166',
    'http://3232235521',
    'http://3232235777',
    'http://7147006462',
    'http://customer1.app.localhost.my.company.127.0.0.1.nip.io',
    'http://localhost:+11211aaa',
    'http://localhost:00011211aaaa',
    'https://localhost:22',
    'https://localhost:443',
    'https://localhost:80',
    'http://localtest.me',
    'https://localtest.me',
];

const allowed = [
    'https://egermano.com',
    'https://google.com',
    'https://github.com',
    'https://facebook.com',
    'https://cloudflare.com',
    'https://microsoft.com?query=test',
];

describe('Blocked URLs', () => {
    blocked.forEach((url) => {
        it(`${url} should be Blocked`, async () => {
            let success;
            try {
                await axios.get(url, {
                    httpAgent: httpAgent(url),
                    httpsAgent: httpAgent(url),
                });
                success = false;
            } catch (error) {
                success = true;
            }
            expect(success).toBeTruthy();
        });
    });
});

describe('Allowed URLs', () => {
    allowed.forEach((url) => {
        it(`${url} should be Allowed`, async () => {
            let success;
            try {
                const response = await axios.get(url, {
                    httpAgent: httpAgent(url),
                    httpsAgent: httpAgent(url),
                });

                success = true;
                expect(response.status).toEqual(200);
            } catch (error) {
                success = false;
            }
            expect(success).toBeTruthy();
        });
    });
});

describe('Allowed URLs with custom DNS', () => {
    const dnsServers = ['1.1.1.1', '8.8.8.8'];
    allowed.forEach((url) => {
        it(`${url} should be Allowed`, async () => {
            let success;
            try {
                const response = await axios.get(url, {
                    httpAgent: httpAgent(url, { dnsServers }),
                    httpsAgent: httpAgent(url, { dnsServers }),
                });

                success = true;
                expect(response.status).toEqual(200);
            } catch (error) {
                success = false;
            }
            expect(success).toBeTruthy();
        });
    });
});

describe('DNS Rebind', () => {
    const url = `http://s-35.185.206.165-127.0.0.1-${new Date().valueOf()}-rr-e.d.rebind.it`;
    it(`Test DNS Rebind ${url}`, async () => {
        let success;
        try {
            await axios.get(url, {
                httpAgent: httpAgent(url),
                httpsAgent: httpAgent(url),
            });
            success = false;
        } catch (error) {
            success = true;
        }
        expect(success).toBeTruthy();
    });
});
