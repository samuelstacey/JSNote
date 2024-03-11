const Fastify = require('fastify');
const noteRoutes = require('../../routes/note-routes.js');
const handleError = require("../../routes/error/error-handler");

function buildFastify() {
    const fastify = Fastify()
    fastify.register(noteRoutes, {prefix: '/api/v1'})
    fastify.setErrorHandler((error, request, reply) => {
        handleError(error, request, reply);
    })

    return fastify
}

module.exports = buildFastify

it('should build Fastify', () => {
    expect(buildFastify()).toBeInstanceOf(Object)
});