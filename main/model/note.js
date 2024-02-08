
const noteBodyJsonSchema = {
    type: 'object',
    required: ['title', 'body', 'dateCreated', 'dateLastModified'],
    properties: {
        title: { type: 'string' },
        body: { type: 'string' },
        dateCreated: {
            type: 'string',
            format: 'date-time'
        },
        dateLastModified: {
            type: 'string',
            format: 'date-time'
        },
        complete: { type: ['boolean', 'null'] },
    }
}


const schema = {
    body: noteBodyJsonSchema,
}

export default schema;