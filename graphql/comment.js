const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'This represents a comment',
    fields: () => ({
        line: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) }
    })
});

module.exports = CommentType;
