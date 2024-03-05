const Fastify = require('fastify');
const noteRoutes = require('../../routes/note-routes.js');


function buildFastify() {
    const fastify = Fastify()
    fastify.register(noteRoutes, {prefix: '/api/v1'})

    return fastify
}

module.exports = buildFastify