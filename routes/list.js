"use strict";

var express = require('express');
var router = express.Router();

const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";
const port = process.env.DBWEBB_PORT || 1337;

router.get('/', async (request, response) => {
    try {
        let res = await findInCollection(dsn, "crowd", {}, {}, 0)

        console.log(res);
        response.json(res);
    } catch (err) {
        console.log(res);
        response.json(res);
    }
});

module.exports = router;

/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
 async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}