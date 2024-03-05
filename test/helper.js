//Test set up

const Fastify = require('fastify');
const path = require('path');
const AutoLoad = require('@fastify/autoload');

//Autobuild and teardown instances
function build() {
    const fastify = Fastify();

    //fastify plugin ensures that all decorators are exposed for testing purposes
    fastify
        .register(AutoLoad, {
            dir: path.join(__dirname, '..', 'config'),
            options: {},
        })
    //     .register(AutoLoad, {
    //         dir: path.join(__dirname, '..', 'plugins'),
    //         options: {},
    //     })
    return fastify;
}

module.exports = build;