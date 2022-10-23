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

        const criteria = {
            username: request.body.username,
        };

        const user = await col.find(criteria).limit(1).toArray();

        if (user.length === 0) {
            return response.status(401).json(
                { message: "User with that username not registered" });
        }

        console.log(request.body.password)

        bcrypt.compare(request.body.password, user[0].password, function (err, res) {
            if (!res) {
                return response.status(401).json(
                    { message: "Incorrect password" });
            }
            return response.status(200).json(
                { data: `${user[0].username} logged in`, id: user[0]["_id"]});
        });
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
