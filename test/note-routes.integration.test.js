const buildFastify = require('./config/app.test')
const noteFunctions = require('../config/spanner/note-functions.js');
const NoteNotFoundError = require("../error/note-not-found-error");

const fastify = buildFastify();
describe('Get all notes', () => {

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

        const res = await fastify.inject({
            method: 'GET',
            url: 'api/v1/note',
        });

        expect(res.statusCode).toEqual(500);
        expect(JSON.parse(res.body).error).toEqual("Internal Server Error");
        expect(JSON.parse(res.body).message).toEqual("Something went wrong!");
    });
});

describe('Get single note by title', () => {

    const mockNoteTitle = "test2";
    const mockGetNoteByTitleReturn =
        {
            NoteID: "4d4b9f03-2ddd-434c-8e77-02ebb54a9172",
            Title: mockNoteTitle,
            Body: "testBody2",
            DateCreated: "2012-11-13T20:20:39.000000000Z",
            DateLastModified: "2028-11-13T20:20:39.000000000Z",
            Complete: false
        };

    it('should return the note with 200 response', async () => {
        const mockedFunction = noteFunctions.getNoteByTitle = jest.fn()
            .mockImplementation(() => Promise.resolve(mockGetNoteByTitleReturn));

        const res = await fastify.inject({
            method: 'GET',
            url: `api/v1/note/${mockNoteTitle}`,
        });

        expect(res.statusCode).toEqual(200);
        expect(JSON.parse(res.body)).toEqual(mockGetNoteByTitleReturn);
        expect(mockedFunction).toHaveBeenCalledWith(mockNoteTitle);
    });

    it('should return no note with 404 response', async () => {
        const mockedFunction = noteFunctions.getNoteByTitle = jest.fn()
            .mockImplementation(() => {
                throw new NoteNotFoundError("There was no note with title: " + mockNoteTitle);
            });

        const res = await fastify.inject({
            method: 'GET',
            url: `api/v1/note/${mockNoteTitle}`,
        });

        expect(res.statusCode).toEqual(404);
        expect(res.statusMessage).toEqual("Not Found");
        expect(mockedFunction).toHaveBeenCalledWith(mockNoteTitle);
    });

    it('should return 500 if DB error', async () => {
        const mockedFunction = noteFunctions.getNoteByTitle = jest.fn()
            .mockImplementation(() => Promise.resolve(Error("Something went wrong!")));

        const res = await fastify.inject({
            method: 'GET',
            url: `api/v1/note/${mockNoteTitle}`,
        });

        expect(res.statusCode).toEqual(500);
        expect(JSON.parse(res.body).error).toEqual("Internal Server Error");
        expect(JSON.parse(res.body).message).toEqual("Something went wrong!");
        expect(mockedFunction).toHaveBeenCalledWith(mockNoteTitle);
    });
});

describe('Delete single note by id', () => {

    let mockNoteID = "4d4b9f03-2ddd-434c-8e77-02ebb54a9172";

    it('should delete the note with 204 response', async () => {
        const mockedFunction = noteFunctions.deleteNote = jest.fn()
            .mockImplementation(() => Promise.resolve(true));

        const res = await fastify.inject({
            method: 'DELETE',
            url: `api/v1/note/${mockNoteID}`,
        });

        expect(res.statusCode).toEqual(204);
        expect(mockedFunction).toHaveBeenCalledWith(mockNoteID);
    });

    it('should fail to delete note with 404 response', async () => {
        const mockedFunction = noteFunctions.deleteNote = jest.fn()
            .mockImplementation(() => Promise.resolve(false));

        const res = await fastify.inject({
            method: 'DELETE',
            url: `api/v1/note/${mockNoteID}`,
        });

        expect(res.statusCode).toEqual(404);
        expect(res.statusMessage).toEqual("Not Found");
        expect(mockedFunction).toHaveBeenCalledWith(mockNoteID);
    });

    it('should return 500 if DB error', async () => {
        const mockedFunction = noteFunctions.deleteNote = jest.fn()
            .mockImplementation(() => Promise.resolve(Error("Something went wrong!")));

        const res = await fastify.inject({
            method: 'DELETE',
            url: `api/v1/note/${mockNoteID}`,
        });

        expect(res.statusCode).toEqual(500);
        expect(JSON.parse(res.body).error).toEqual("Internal Server Error");
        expect(JSON.parse(res.body).message).toEqual("Something went wrong!");
        expect(mockedFunction).toHaveBeenCalledWith(mockNoteID);
    });
});


describe('Add note', () => {
    const title = "test2";
    const body = "testBody2";
    const dateCreated = "2012-11-13T20:20:39.000000000Z";
    const dateLastModified = "2028-11-13T20:20:39.000000000Z";
    const requestJson = {
        title: title,
        body: body,
        dateCreated: dateCreated,
        dateLastModified: dateLastModified
    }
    const mockAddNoteReturn = [{
        NoteID: "4d4b9f03-2ddd-434c-8e77-02ebb54a9172",
        Title: title,
        Body: body,
        DateCreated: dateCreated,
        DateLastModified: dateLastModified,
        Complete: false
    }];

    it('should create a note with 201 response', async () => {
        const mockedFunction = noteFunctions.addNote = jest.fn()
            .mockImplementation(() => Promise.resolve(mockAddNoteReturn));

        const res = await fastify.inject({
            method: 'POST',
            url: `api/v1/note`,
            payload: requestJson,
            headers: {
                "content-type": 'application/json',
            },
        });

        expect(res.statusCode).toEqual(200);
        expect(JSON.parse(res.body)).toEqual(mockAddNoteReturn);
        expect(mockedFunction).toHaveBeenCalledWith(requestJson);
    });

    it('should return 500 if db fails', async () => {

        //TODO: Should this be an if mocked function throws? Rather than returns an error?
        // YES, update to be consistent with line 107
        const mockedFunction = noteFunctions.addNote = jest.fn()
            .mockImplementation(() => Promise.resolve(Error("Something went wrong!")));

        const res = await fastify.inject({
            method: 'POST',
            url: `api/v1/note`,
            payload: requestJson,
            headers: {
                "content-type": 'application/json',
            },
        });

        expect(res.statusCode).toEqual(500);
        expect(JSON.parse(res.body).error).toEqual("Internal Server Error");
        expect(JSON.parse(res.body).message).toEqual("Something went wrong!");
        expect(mockedFunction).toHaveBeenCalledWith(requestJson);
    });

    it('should return 404 if invalid request body', async () => {
        const mockedFunction = noteFunctions.addNote = jest.fn()
            .mockImplementation(() => Promise.resolve([]));

        const res = await fastify.inject({
            method: 'POST',
            url: `api/v1/note`,
            payload: requestJson,
            headers: {
                "content-type": 'application/json',
            },
        });

        expect(res.statusCode).toEqual(404);
        expect(res.statusMessage).toEqual("Not Found");
        expect(mockedFunction).toHaveBeenCalledWith(requestJson);
    });
});

