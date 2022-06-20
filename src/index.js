const http = require('http');
const https = require('https');
const dns = require('dns');
const net = require('net');
const ipaddr = require('ipaddr.js');

const defaultOptions = {
    dnsServers: [],
};

const validIp = (ip) => {
    if (!ipaddr.isValid(ip)) {
        return false;
    }
    try {
        const addr = ipaddr.parse(ip);
        const range = addr.range();
        if (range !== 'unicast') {
            return false;
        }
    } catch (err) {
        return false;
    }
    return true;
};

/**
 *
 * @param {string} url
 * @param {{dnsServers : string[]}} connectionOptions
 * @returns {(http.Agent | https.Agent)} a new http or https agent
 */
const manageConnection = (url, connectionOptions) => {
    const agent = url.startsWith('https') ? new https.Agent() : new http.Agent();

    const combinedOptions = { ...defaultOptions, ...connectionOptions };
    if (combinedOptions.dnsServers.length > 0) {
        dns.setServers(combinedOptions.dnsServers);
    }

    agent.originalCreateConnection = agent.createConnection;
    agent.createConnection = (options, cb) => {
        const { host } = options;
        if (!!net.isIP(host) && !validIp(host)) {
            throw new Error(`Call to ${host} is blocked.`);
        }

        // eslint-disable-next-line no-param-reassign
        options.lookup = async (hostname, opt, callback) => dns.resolve(hostname, (err, addresses) => {
            if (err) {
                return callback(err);
            }

            const family = net.isIP(addresses[0]);
            return callback(err, addresses[0], family);
        });

        const socket = agent.originalCreateConnection(options, cb);
        socket.on('lookup', (error, address) => {
            if (error || validIp(address)) {
                return false;
            }

            return socket.destroy(new Error(`Call to ${address} is blocked.`));
        });
        return socket;
    };
    return agent;
};

/**
 * @module http-agent-dns
 *
 * Creates a new Agent with a custom DNS lookup option and SSRF protection
 *
 * @param {string} url
 * @param {{dnsServers : string[]}} options
 * @returns {(http.Agent | https.Agent)} a new http or https agent
 */
module.exports = (url, options) => manageConnection(url, options);
