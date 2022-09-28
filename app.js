const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()

const app = express();
const port = 1337;

const index = require('./routes/index');
const hello = require('./routes/hello');
const list = require('./routes/list');
const docs = require('./routes/docs');
const create = require('./routes/create');

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use('/', index);
app.use('/hello', hello);
app.use('/list', list);
app.use('/docs', docs);
app.use('/create', create);

app.use(express.json());

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});