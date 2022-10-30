"use strict";

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json({ strict: false }));

const database = require('./../db/database');

router.post('/',
    (req, res, next) => verifyToken(req, res, next),
    (req, res) => removeComment(req, res)
);

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return res.status(401).json(
                { message: "Token no longer valid" });
        }
        req.user = decoded.username;
        next();
    });
}

async function removeComment(req, res) {
    let db;

    try {
        db = await database.getDb("comments");
        const col = db.collection;

        const docName = req.body.name;
        const index = parseInt(req.body.index);
        const line = req.body.line;

        let result = await col.find({name: docName}).toArray();
        const updatedComments = result[0].comments;

        let indexCount = 0;
        let lineCount = 0;
        for (const comment of updatedComments) {
            if (comment.line === line) {
                if (lineCount === index) {
                    updatedComments.splice(indexCount, 1);
                    break;
                }
                lineCount++;
            }
            indexCount++;
        };

        result = await col.updateOne({name: docName}, {$set: {comments: updatedComments}});

        if (result.acknowledged) {
            return res.status(201).json({ data: "Removed comment from document" });
        }
    } catch (e) {
        return res.status(500).json({
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
