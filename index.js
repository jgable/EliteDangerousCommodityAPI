'use strict';

const boom = require('boom');
const Hapi = require('hapi');

const {System, Commodity, sequelize} = require('./models');

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
  path: '/systems/search',
  handler: (request, reply) => {
    let {name, fields} = request.query;

    name = name && name.trim();
    fields = (fields && fields.split(',')) || [];

    if (!name || name.length < 3) {
      return reply(
        boom.notAcceptable('"name" parameter is required and must have at least 3 characters')
      );
    }

    const query = System.findAll({
      attributes: ['id', 'name', 'x', 'y', 'z', ...fields],
      where: {
        name: {
          $like: `%${name}%`
        }
      },
      limit: 10,
      order: 'name ASC',
    });

    query
      .then(stations => reply({stations}))
      .catch(err => reply(boom.badImplementation(err.message)));
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

sequelize.sync()
  .then(() => server.start())
  .then(() => console.log('Server running at:', server.info.uri))
  .catch((err) => {
    console.log('Problem starting the server');
    throw err;
  });
