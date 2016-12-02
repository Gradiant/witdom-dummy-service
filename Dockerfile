FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/dummy_service
WORKDIR /usr/src/dummy_service

# Copy and install app dependencies
COPY package.json /usr/src/dummy_service
RUN npm install

# Bundle app source
COPY index.js ./
COPY api/. api/
COPY config/. config/
COPY controllers/. controllers/

EXPOSE 8080

CMD [ "npm", "start" ]

# For the image build: $ docker build -t dummy-service .
# For the container run: $ docker run --name po --add-host=broker:10.5.1.120 -p 8080:8080 -e "BROKER_PORT=5000" -d dummy-service
# For the td service run: $ docker run --name service_td --add-host=broker:10.5.1.120 -p 8081:8080 -e "BROKER_PORT=5000" -d dummy-service
# For the ud service run: $ docker run --name service_ud --add-host=broker:10.5.1.120 -p 8082:8080 -e "BROKER_PORT=5100" -d dummy-service
