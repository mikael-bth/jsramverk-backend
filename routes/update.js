"use strict";

var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json({ strict: false }));

const database = require('./../db/database');

router.put('/', async (request, response) => {
    let db;

    try {
        db = await database.getDb();
        const col = db.collection;

        const updatedDoc = {
            name: request.body.name,
            html: request.body.html
        }
        const res = await col.updateOne({name: updatedDoc.name}, {$set:{html:updatedDoc.html}});
        if (res.acknowledged) {
            return response.status(201).json({ data: `Updated: ${res.modifiedCount}` });
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