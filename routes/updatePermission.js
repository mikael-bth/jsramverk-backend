"use strict";

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json({ strict: false }));

const database = require('./../db/database');

router.put('/',
    (req, res) => updatePermission(req, res)
);

async function updatePermission(request, response) {
    let db;

    try {
        db = await database.getDb();
        const col = db.collection;

        const updatedDoc = {
            name: request.body.name,
            user: request.body.user
        };

        let res;

        if (request.body.method === "add") {
            res = await col.updateOne({name: updatedDoc.name}, {$push: {users: updatedDoc.user}});
        } else {
            res = await col.updateOne({name: updatedDoc.name}, {$pull: {users: updatedDoc.user}});
        }

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
