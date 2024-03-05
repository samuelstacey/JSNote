const fastifyPlugin = require('fastify-plugin');
const fastifyMongo = require('@fastify/mongodb');

/**
 * @deprecated Replaced with CloudSpanner DB as of 04/03/24
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/test_database'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)