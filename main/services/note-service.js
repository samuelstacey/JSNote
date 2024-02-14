
class NoteService {

    constructor(fastify, collection) {
        this.fastify = fastify;
        this.collection = collection;
    }

    getAll = async () => {
        const result = await collection.find().toArray()
        if (result.length === 0) {
           return ResponseObject =  {
            statusCode: 404,
            body: {
                errors: "put custom error here!"
            }
           }
        }
        return ResponseObject =  {
            statusCode: 200,
            body: result 
        }
    }

    addNote = async (request) => {
        const result = await collection.insertOne({ note: request.body })
        if (result.length === 0) {
           return ResponseObject =  {
            statusCode: 404,
            body: {
                errors: "put custom error here!"
            }
           }
        }
        return ResponseObject =  {
            statusCode: 201,
            body: result 
        }
    }

    searchByTitle = async (request) => {
        const result = await collection.findOne({ "note.title": request.params.title })
        if (result.length === 0) {
           return ResponseObject =  {
            statusCode: 404,
            body: {
                errors: "put custom error here!"
            }
           }
        }
        return ResponseObject =  {
            statusCode: 201,
            body: result 
        }
    }


}

export default NoteService;