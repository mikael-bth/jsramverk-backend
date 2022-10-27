const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1337;

const httpServer = require("http").createServer(app);

const index = require('./routes/index');
const hello = require('./routes/hello');
const docs = require('./routes/docs');
const doc = require('./routes/doc');
const create = require('./routes/create');
const update = require('./routes/update');
const reset = require('./routes/reset');
const register = require('./routes/register');
const login = require('./routes/login');
const verify = require('./routes/verify');
const updatePermission = require('./routes/updatePermission');
const graphql = require('./routes/graphql');

app.use(cors());

const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('create', function(room) {
        socket.join(room);
    });

    socket.on("doc", function (doc) {
        socket.to(doc["_id"]).emit("doc", doc);
    });
});

// don't show the log when it is test
if (process.env.NODE_ENV === 'production') {
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
app.use('/docs', docs);
app.use('/doc', doc);
app.use('/create', create);
app.use('/update', update);
app.use('/reset', reset);
app.use('/register', register);
app.use('/login', login);
app.use('/verify', verify);
app.use('/updatepermission', updatePermission);
app.use('/graphql', graphql);

app.use(express.json());

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

// Start up server
const server = httpServer.listen(port, () =>
    console.log(`editor-backend listening on port ${port}!`));

module.exports = server;
