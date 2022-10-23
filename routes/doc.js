"use strict";

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const database = require('./../db/database');

router.get('/:name',
    (req, res, next) => verifyToken(req, res, next),
    (req, res) => getDoc(req, res)
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

async function getDoc(req, res) {
    let db;

    try {
        db = await database.getDb();
        const col = db.collection;
        const criteria = {
            name: req.params.name
        };
        const result = await col.find(criteria).limit(1).toArray();

        if (result[0].users.includes(req.user)) {
            res.json(result);
        } else {
            return res.status(401).json(
                { message: "You don't have access to this document" });
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
