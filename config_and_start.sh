#!/bin/bash

## Set default config when it is not set through environment variables

if [ -z "$SERVICE_HTTP_PORT" ]; then
    SERVICE_HTTP_PORT="8080"
fi

if [ -z "$SERVICE_HTTPS_PORT" ]; then
    SERVICE_HTTPS_PORT="8443"
fi

if [ -z "$SERVICE_CERT" ]; then
    SERVICE_CERT="certs/po_crt.pem"
fi

if [ -z "$SERVICE_KEY" ]; then
    SERVICE_KEY="certs/po_key.pem"
fi

if [ -z "$SERVICE_KEY_PASSPHRASE" ]; then
    SERVICE_KEY_PASSPHRASE="Gr4d14ntP0"
fi

if [ -z "$CA_CERTS" ]; then
    CA_CERTS="certs/tdcacert.pem"
fi

CA_CERTS_STRING=
OIFS=$IFS
IFS=','
for cert in $CA_CERTS
do
    if [ -z "$CA_CERTS_STRING" ]; then
        CA_CERTS_STRING=\'$cert\'
    else
        CA_CERTS_STRING=${CA_CERTS_STRING},\'$cert\'
    fi
done
IFS=$OIFS


if [ -z "$PROTOCOL" ]; then
    PROTOCOL="http"
fi

if [ -z "$BROKER_HOST" ]; then
    BROKER_HOST="broker-td"
fi

if [ -z "$BROKER_HTTP_PORT" ]; then
    BROKER_HTTP_PORT="5000"
fi

if [ -z "$BROKER_HTTPS_PORT" ]; then
    BROKER_HTTPS_PORT="5043"
fi

if [ -z "$PO_SLEEP" ]; then
    PO_SLEEP="2"
fi

if [ -z "$TD_SLEEP" ]; then
    TD_SLEEP="2"
fi

if [ -z "$UD_SLEEP" ]; then
    UD_SLEEP="2"
fi


## Write the custom configuration file

cat << EOF > custom_config.js

module.exports = {
    http: { port: ${SERVICE_HTTP_PORT} },
    https: {
        port: ${SERVICE_HTTPS_PORT},
        service_key: '${SERVICE_KEY}',
        service_key_passphrase: '${SERVICE_KEY_PASSPHRASE}',
        service_cert: '${SERVICE_CERT}',
        ca_certs: [${CA_CERTS_STRING}]
    },
    broker: {
        host: '${BROKER_HOST}',
        protocol: '${PROTOCOL}',
        http: {
            port: ${BROKER_HTTP_PORT}
        },
        https: {
            port: ${BROKER_HTTPS_PORT}
        }
    },
    po_sleep: ${PO_SLEEP},
    service_td_sleep: ${TD_SLEEP},
    service_ud_sleep: ${UD_SLEEP}
};

EOF

## Start the dummy service using the created custom configuration file

npm start -- custom_config.js