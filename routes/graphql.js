"use strict";

const visual = false;
const { graphqlHTTP } = require('express-graphql');
var express = require('express');
var router = express.Router();
const {
    GraphQLSchema, GraphQLList
} = require("graphql");

const RootQueryType = require('../graphql/root');

const schema = new GraphQLSchema({
    query: RootQueryType
});

const DocType = require('./../graphql/doc');

router.use('/', graphqlHTTP({
    schema: schema,
    graphiql: visual,
    docs: {
        type: new GraphQLList(DocType),
        description: 'List of all documents',
    }
}));

module.exports = router;
