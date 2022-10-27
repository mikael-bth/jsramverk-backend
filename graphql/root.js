const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const DocType = require('./doc');
const UserType = require('./user');

const database = require('./../db/database');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        doc: {
            type: DocType,
            description: 'A single document',
            args: {
                docName: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                const docArray = await getData();

                return docArray.find(doc => doc.name === args.docName);
            }
        },
        docs: {
            type: new GraphQLList(DocType),
            description: 'List of all documents',
            resolve: async function() {
                return await getData();
            }
        },
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                username: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                const userArray = await getData("users");

                return userArray.find(doc => doc.username === args.username);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function() {
                return await getData("users");
            }
        },
    })
});

async function getData(collection = "docs", res = undefined) {
    let db;

    try {
        db = await database.getDb(collection);
        const col = db.collection;
        const result = await col.find().toArray();

        if (collection === "users") {
            result.forEach(hidePassword);
        }

        if (res === undefined) {
            return result;
        }

        return res.json({
            data: result
        });
    } catch (e) {
        return res.json({
            errors: {
                status: 500,
                name: "Database Error",
                description: e.message,
                path: "/",
            }
        });
    } finally {
        await db.client.close();
    }

    function hidePassword(user, index, array) {
        array[index].password = "********";
    }
}

module.exports = RootQueryType;
