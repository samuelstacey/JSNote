
import schema from '../model/note.js'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
    const collection = fastify.mongo.db.collection('note')

    //Get all notes
    fastify.get('/note', async (request, reply) => {
        const result = await collection.find().toArray()
        if (result.length === 0) {
          throw new Error('No documents found')
        }
        return result
      })
    
    //Search by note title
    fastify.get('/note/:title', async (request, reply) => {
    const result = await collection.findOne({ "note.title": request.params.title })
    if (!result) {
        throw new Error('Invalid value')
    }
    return result
    })

    fastify.post('/note', { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    const result = await collection.insertOne({ note: request.body })
    return result
    })
  }
  
  //ESM
  export default routes;