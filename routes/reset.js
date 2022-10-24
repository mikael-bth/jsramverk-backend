"use strict";

var express = require('express');
var router = express.Router();

const database = require('./../db/database');

router.get('/', async (request, response) => {
    let db;

    try {
        db = await database.getDb();
        const docsCol = db.collection;
        const docsRes = await docsCol.deleteMany();

        db = await database.getDb("users");
        const usersCol = db.collection;
        const usersRes = await usersCol.deleteMany();

        response.status(201).json(
            { data: `DB RESET. ${docsRes.deletedCount} doc/s removed.`
            + ` ${usersRes.deletedCount} user/s removed.`});
    } catch (e) {
        return response.status(500).json({
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message
            }
        });
    } finally {
        await db.client.close();
    }
});

module.exports = router;
