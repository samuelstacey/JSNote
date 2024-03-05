const schema = require('../model/note.js');
const noteFunctions = require('../config/spanner/note-functions.js');

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {

    //TODO: Delete function may be appropriate - consider the danger when deleting objects,
    // likely not a problem in this case but archival may be more appropriate?

    //Get all notes
    fastify.get('/note', async (request, reply) => {
        return await noteFunctions.getAllNotes()
    })

    //Search by note title
    fastify.get('/note/:title', async (request, reply) => {
        const result = await noteFunctions.getNoteByTitle(request.params.title)
        if (!result) {
            throw new Error('Invalid value')
        }
        return result
    })

    fastify.post('/note', {schema}, async (request, reply) => {
        // we can use the `request.body` object to get the data sent by the client
        return await noteFunctions.addNote(request.body)
    })
}

module.exports = routes;