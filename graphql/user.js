const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    })
});

module.exports = UserType;
