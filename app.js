const Fastify = require('fastify');
const noteRoutes = require('./routes/note-routes.js');
const handleError = require("./routes/error/error-handler");

const fastify = Fastify({
  logger: true
})


fastify.register(noteRoutes, {prefix: '/api/v1'})
fastify.setErrorHandler((error, request, reply) => {
  handleError(error, request, reply);
})

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