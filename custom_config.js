
module.exports = {
    http: { port: 8080 },
    https: {
        port: 8443,
        service_key: 'certs/po_key.pem',
        service_key_passphrase: 'Gr4d14ntP0',
        service_cert: 'certs/po_crt.pem',
        ca_certs: ['certs/tdcacert.pem']
    },
    brokerProtocol: "http",
    brokerHost: "broker-td",
    brokerPort: "5000",
    po_sleep: 2,
    service_td_sleep: 2,
    service_ud_sleep: 2
};

