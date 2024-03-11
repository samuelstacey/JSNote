const NoteNotFoundError = require("../../error/note-not-found-error");


function handleError(error, request, reply) {
    if (error instanceof NoteNotFoundError) {
        reply.status(404).send(error)
    }

    reply.status(500).send(error)
}

module.exports = handleError;