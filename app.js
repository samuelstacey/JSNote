const Fastify = require('fastify');
const dbConnector = require('./config/mongo-db-connector.js');
const noteRoutes = require('./routes/note-routes.js');

const fastify = Fastify({
  logger: true
})


fastify.register(dbConnector)
fastify.register(noteRoutes, {prefix: '/api/v1'})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()