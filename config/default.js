module.exports = {
    http: { port: 8080 },
    https: {
        port: 8443,
        service_key: 'certs/po_key.pem',
        service_key_passphrase: 'Gr4d14ntP0',
        service_cert: 'certs/po_crt.pem',
        ca_certs: ['certs/tdcacert.pem']
    },
    broker: {
        host: 'broker-td',
        protocol: 'https',
        http: {
            port: 5000
        },
        https: {
            port: 5043
        }
    },
    //brokerUrlPrefix: "http://broker-td:5000/v1",
    po_sleep: 2,
    service_td_sleep: 2,
    service_ud_sleep: 2
};
