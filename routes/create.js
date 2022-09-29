"use strict";

var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json({ strict: false }));

const database = require('./../db/database');

router.post('/', async (request, response) => {
    let db;

    try {
        db = await database.getDb();
        const col = db.collection;

        const newDoc = {
            name: request.body.name,
            html: request.body.html
        };
        const res = await col.insertOne(newDoc);
        if (res.acknowledged) {
            return response.status(201).json({ data: res.insertedId });
        }
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