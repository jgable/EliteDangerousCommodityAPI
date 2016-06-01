'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 8000,
});

// Add the default home page route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply('Elite Dangerous Commodity Finder; powered by eddb.io');
  }
});

// Add the station search route
server.route({
  method: 'GET',
  path: '/stations/search',
  handler: (request, reply) => {
    return reply({stations: []});
  }
});

// Add the commodity find route
server.route({
  method: 'GET',
  path: '/commodities/search',
  handler: (request, reply) => {
    return reply({stations: [], systems: [], commodities: [], results: []});
  }
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
