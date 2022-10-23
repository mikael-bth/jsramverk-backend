"use strict";

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json({ strict: false }));

const database = require('./../db/database');

router.put('/',
    (req, res) => updateDoc(req, res)
);

async function updateDoc(request, response) {
    let db;

    try {
        db = await database.getDb();
        const col = db.collection;

        const updatedDoc = {
            name: request.body.name,
            html: request.body.html
        };
        const res = await col.updateOne({name: updatedDoc.name}, {$set: {html: updatedDoc.html}});

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
}

module.exports = router;
