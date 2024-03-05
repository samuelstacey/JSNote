const axios = require('axios');
const build = require('./helper.js');
const noteRoute = require('../routes/note-routes.js');

const requestJson =
    {
        "title": "test2",
        "body": "testBody2",
        "dateCreated": "2012-11-13T20:20:39+00:00",
        "dateLastModified": "2028-11-13T20:20:39+00:00"
    }

jest.mock('axios');

describe('Test all notes routes', () => {
    let fastify;

    beforeAll(async () => {
        fastify = await build();
        await fastify.register(noteRoute)
    })

    afterAll(async () => {
        await fastify.close();
    })

    describe('Add note', () => {
        it('should create a note with 201 response', async () => {
            const mockResponse = {
                status: 201,
                data: {
                    message: requestJson
                }
            }

            axios.post()
                .mockImplementationOnce(() => Promise
                    .resolve(mockResponse));
            const res = await fastify.inject({
                method: 'POST',
                url: 'api/v1/note',
                payload: requestJson,
                headers: {
                    "content-type": 'application/json',
                },
            });
            expect(res.statusCode).toEqual(201);
        });

        it('should return 500 if db fails', () => {

        });

        it('should return 404 if invalid request body', () => {

        });
    });

})

