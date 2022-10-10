const mongo = require("mongodb").MongoClient;
const collectionName = "docs";

const database = {
    getDb: async function getDb() {
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}` +
        '@cluster0.glp35lj.mongodb.net/docs?retryWrites=true&w=majority';

        if (process.env.NODE_ENV !== 'production') {
            dsn = `mongodb://localhost:27017/${collectionName}`;
            if (process.env.NODE_ENV === 'test') {
                dsn = 'mongodb://localhost:27017/test';
            }
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
