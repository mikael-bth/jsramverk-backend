var express = require('express');
var router = express.Router();

router.get('/:msg', function (req, res) {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

module.exports = router;
