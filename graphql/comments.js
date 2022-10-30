const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} = require('graphql');

const CommentType = require('./comment');

const CommentsType = new GraphQLObjectType({
    name: 'Comments',
    description: 'This represents a documents comments',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        comments: { type: new GraphQLList(CommentType) }
    })
});

module.exports = CommentsType;
