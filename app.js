// ESM
import Fastify from 'fastify'
import dbConnector from './main/Config/mongo-db-connector.js'
import noteRoutes from './main/Routes/note-routes.js'

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