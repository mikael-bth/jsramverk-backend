"use strict";

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json({ strict: false }));

const database = require('./../db/database');

router.post('/',
    (req, res, next) => verifyToken(req, res, next),
    (req, res) => createDoc(req, res)
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

async function createDoc(req, res) {
    let db;

    try {
        db = await database.getDb();
        const col = db.collection;

        const newDoc = {
            name: req.body.name,
            html: req.body.html,
            users: [req.user]
        };
        const result = await col.insertOne(newDoc);

        if (result.acknowledged) {
            return res.status(201).json({ data: "Created doc",
                id: result.insertedId, user: req.user });
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
