"use strict";

var express = require('express');
var router = express.Router();

const database = require('./../db/database');

router.get('/', async (request, response) => {
    let db;

    try {
        db = await database.getDb();
        const col = db.collection;
        const res = await col.deleteMany();

        response.status(201).json({ data: `DB RESET. ${res.deletedCount} doc/s removed`});
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
