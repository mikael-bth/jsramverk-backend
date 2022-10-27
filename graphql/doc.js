const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

const DocType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a document',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        html: { type: new GraphQLNonNull(GraphQLString) },
        users: { type: new GraphQLList(GraphQLString) }
    })
});

module.exports = DocType;
