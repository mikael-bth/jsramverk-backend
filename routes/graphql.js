"use strict";

const visual = false;
const { graphqlHTTP } = require('express-graphql');
var express = require('express');
var router = express.Router();
const {
    GraphQLSchema
} = require("graphql");

const RootQueryType = require('../graphql/root');

const schema = new GraphQLSchema({
    query: RootQueryType
});

router.use('/', graphqlHTTP({
    schema: schema,
    graphiql: visual,
}));

module.exports = router;
