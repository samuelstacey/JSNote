
const projectId = 'starlit-surge-416209';
const instanceId = 'test-instance';
const databaseId = 'note-database';

// Imports the Google Cloud client library
const {Spanner} = require('@google-cloud/spanner');
const NoteNotFoundError = require("../../error/note-not-found-error");

// creates a client
const spanner = new Spanner({
    projectId: projectId,
});

// Gets a reference to a Cloud Spanner instance
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);

async function getAllNotes() {
    const getAllNotesStatement = {
        sql: `SELECT * FROM Notes`,
    };
    const [rows] = await database.run(getAllNotesStatement);

    console.log(`Notes:`);
    rows.forEach(row => console.log(row));
    return rows;
}

async function getNoteByTitle(title) {
    const getNoteByTitleStatement = {
        sql: `SELECT * FROM Notes WHERE Title = @Title`,
        params: {
            Title: title,
        }
    };
    const [rows] = await database.run(getNoteByTitleStatement);

    if (rows.length === 0) {
        throw new NoteNotFoundError("There was no note with title: " + title);
    }

    console.log(`Notes:`);
    rows.forEach(row => console.log(row));
    return rows;
}

async function addNote(note) {
    const notesTable = database.table('Notes');

    console.log(note)
    await notesTable.insert({
        Title: note.title,
        Body: note.body,
        DateCreated: new Date(note.dateCreated),
        DateLastModified: new Date(note.dateLastModified),
        Complete: note.complete,
    });
    console.log('Inserted data.');
    return note;
}

async function deleteNote(id) {
    const notesTable = database.table('Notes');
    await notesTable.deleteRows([id])
    console.log(`Deleted data with ID:${id}`);
    return true;
}

module.exports = {
    getAllNotes,
    getNoteByTitle,
    addNote,
    deleteNote
}