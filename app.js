// ESM
import Fastify from 'fastify'
import dbConnector from './Config/mongo-db-connector.js'
import testRoute from './Routes/test-route.js'

const fastify = Fastify({
  logger: true
})


fastify.register(dbConnector)
fastify.register(testRoute)

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