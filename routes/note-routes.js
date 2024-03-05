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
        return await noteFunctions.getAllNotes();
    })

    //Search by note title
    //TODO: is there a possibility of multiple notes (yes) what are we doing about this?
    fastify.get('/note/:title', async (request, reply) => {
        const result = await noteFunctions.getNoteByTitle(request.params.title);
        if (!result) {
            reply.code(404);
        }
        return result;
    })

    fastify.delete('/note/:id', async (request, reply) => {
        await noteFunctions.deleteNote(request.params.id);
        //TODO: Do we fail silently if object already doesn't exist? (YES) Do we really want this?
        reply.code(204);
    })

    fastify.post('/note', {schema}, async (request, reply) => {
        let result = await noteFunctions.addNote(request.body);
        if (Array.isArray(result) && !result.length) {
            reply.code(404);
        }
        return result;
    })
}

module.exports = routes;