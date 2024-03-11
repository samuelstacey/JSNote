const schema = require('../model/note.js');
const noteFunctions = require('../config/spanner/note-functions.js');

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {

    //Get all notes
    fastify.get('/note', async (request, reply) => {
        return await noteFunctions.getAllNotes();
    })

    //Search by note title, returns a set of notes
    fastify.get('/note/:title', async (request, reply) => {
        return await noteFunctions.getNoteByTitle(request.params.title);
    })

    //delete note by id
    fastify.delete('/note/:id', async (request, reply) => {
        const deleted = await noteFunctions.deleteNote(request.params.id);
        //TODO: Correct behaviour but this code is a disgrace, fix this with a top-level error handler
        if (deleted === false) {
            reply.code(404);
        } else if (deleted === true) {
            reply.code(204);
        }
        return deleted;
    })

    //add note
    fastify.post('/note', {schema}, async (request, reply) => {
        let result = await noteFunctions.addNote(request.body);
        if (Array.isArray(result) && !result.length) {
            reply.code(404);
        }
        return result;
    })
}

module.exports = routes;