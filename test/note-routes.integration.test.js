const buildFastify = require('./config/app.test')
const noteFunctions = require('../config/spanner/note-functions.js');

describe('Test all notes routes', () => {
    const fastify = buildFastify();
    const requestJson =
        {
            title: "test2",
            body: "testBody2",
            dateCreated: "2012-11-13T20:20:39+00:00",
            dateLastModified: "2028-11-13T20:20:39+00:00"
        }

    const mockGetAllReturn = [
        {
            NoteID: "4d4b9f03-2ddd-434c-8e77-02ebb54a9172",
            Title: "test2",
            Body: "testBody2",
            DateCreated: "2012-11-13T20:20:39.000000000Z",
            DateLastModified: "2028-11-13T20:20:39.000000000Z",
            Complete: false
        },
        {
            NoteID: "788674a6-dd85-4426-b85b-19254f255a6d",
            Title: "test2",
            Body: "testBody2",
            DateCreated: "2012-11-13T20:20:39.000000000Z",
            DateLastModified: "2028-11-13T20:20:39.000000000Z",
            Complete: false
        },
        {
            NoteID: "ba2793d3-28df-452d-9bf1-b24d0a2a7e59",
            Title: "Important Note",
            Body: "Some important stuff",
            DateCreated: "2021-03-04T22:30:23.000000000Z",
            DateLastModified: "2023-04-06T18:35:45.000000000Z",
            Complete: false
        }
    ]

    describe('Get all notes', () => {
        it('should return all notes with 200 response', async () => {

            noteFunctions.getAllNotes = jest.fn()
                .mockImplementation(() => Promise.resolve(mockGetAllReturn));

            const res = await fastify.inject({
                method: 'GET',
                url: 'api/v1/note',
            });

            expect(res.statusCode).toEqual(200);
            expect(JSON.parse(res.body)).toEqual(mockGetAllReturn);
        });

        it('should return no notes with 200 response', async () => {

            noteFunctions.getAllNotes = jest.fn()
                .mockImplementation(() => Promise.resolve([]));

            const res = await fastify.inject({
                method: 'GET',
                url: 'api/v1/note',
            });

            expect(res.statusCode).toEqual(200);
            expect(JSON.parse(res.body)).toEqual([]);
        });

        it('should return 500 if DB error', async () => {

            noteFunctions.getAllNotes = jest.fn()
                .mockImplementation(() => Promise.resolve(Error("Something went wrong!")));
            ;

            const res = await fastify.inject({
                method: 'GET',
                url: 'api/v1/note',
            });

            expect(res.statusCode).toEqual(500);
            expect(JSON.parse(res.body).error).toEqual("Internal Server Error");
            expect(JSON.parse(res.body).message).toEqual("Something went wrong!");
        });
    });


    describe('Add note', () => {
        it('should create a note with 201 response', async () => {
        });

        it('should return 500 if db fails', () => {
        });

        it('should return 404 if invalid request body', () => {
        });
    });

})

