import noteSchema from '../model/note.js'
import NoteService from '../services/note-service.js'


/**
 * Defines the routes and handlers
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {

    // Collection is gettable here but not elsewhere. Fastify is worse than spring for confusingly being pulled in...
    const collection = fastify.mongo.db.collection('note')
    const noteService = new NoteService(fastify, collection);

    //HANDLERS
    //TODO: Data modelling doesn't seem to be very good.
    async function addNoteHandler(request, reply) {
        //TODO: Add logging
        const response = await noteService.addNote(request);
        reply.code(response.code).send(response.body);
    }


    async function searchByTitleHandler(request, reply) {
        //TODO: Add logging?
        const response = await noteService.findByTitle(request);
        reply.code(response.code).send(response.body);
    }


    async function getAllNotesHandler(request, reply) {
        //TODO: Add logging?
        const result = await collection.find().toArray();
        console.log(result);
        const response = await noteService.getAll();
        reply.code(response.code).send(response.body);
    }


    //ROUTES
    fastify.route({
        method: 'POST',
        url: '/note',
        schema: noteSchema,
        handler: addNoteHandler,
    });

    fastify.route({
        method: 'GET',
        url: '/note/:title',
        handler: searchByTitleHandler,
    });

    fastify.route({
        method: 'GET',
        url: '/note',
        handler: getAllNotesHandler,
    });

};

export default routes;