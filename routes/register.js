"use strict";

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

router.use(bodyParser.json({ strict: false }));

const database = require('./../db/database');

router.post('/', async (request, response) => {
    let db;

    try {
        db = await database.getDb("users");
        const col = db.collection;

        const newUser = {
            username: request.body.username
        };

        const user = await col.find(newUser).limit(1).toArray();

        if (user.length !== 0) {
            return response.status(401).json(
                { message: "User with that username already registered" });
        }

        newUser.password = await bcrypt.hash(request.body.password, 10);

        const res = await col.insertOne(newUser);
        if (res.acknowledged) {
            return response.status(201).json({ data: "Created user", id: res.insertedId });
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