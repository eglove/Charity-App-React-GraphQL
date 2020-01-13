const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode jwt to get user id on each request
server.express.use((req, res, next) => {
    const {token} = req.cookies;
    if(token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        // put userid onto request for access
        req.userId = userId;
    }
    next();
});

// create middleware that populates user on each request
server.express.use(async (req, res, next) => {
    // skip this if user isn't logged in
    if(!req.userId) return next();
    const user = await db.query.user(
        {where:{id: req.userId}},
        '{id, permissions, email, name}'
    );
    req.user = user;
    next();
});

server.start({
   cors: {
       credentials: true,
       origin: process.env.FRONTEND_URL,
   }
}, deets => {
    console.log(`Server is now running on port ${deets.port}`);
});