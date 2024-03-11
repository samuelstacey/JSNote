class NoteNotFoundError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = "NoteNotFoundError";
    }
}

module.exports = NoteNotFoundError;