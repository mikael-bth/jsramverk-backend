"use strict";

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function (request, response) {
    const token = request.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return response.status(401).json(
                { message: "Token no longer valid" });
        }
        return response.status(200).json({data: decoded});
    });
});

module.exports = router;
