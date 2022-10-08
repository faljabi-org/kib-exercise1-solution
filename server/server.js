const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const ENVIRONMENTS = require('./constants/node-environments');

const app = express();

// Middlewares

app.use(helmet());
app.use(express.json());
app.use(cors());

// Routers

app.use('/api/users', require('./routes/users'));

// Custom Middlewares

app.use(require('./middlewares/handle-errors'));

// Handle unhandledRejection and uncaughtException exceptions:
// This is not a good practice for production apps where it should fail gracefully.
// I usually have an error logger middleware to log errors to a database.

process
    .on('unhandledRejection', (reason, p) => {

        console.error('Unhandled Rejection at promise %s. Reason: %s', p, reason);
    })
    .on('uncaughtException', error => {

        console.error('Uncaught Exception thrown. Error: %s', error);
        process.exit(1);
    });

// Detect any blocking or extensive requests or tasks during development

if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {

    const blocked = require('blocked-at');

    blocked((time, stack) => {

        console.log(`Blocked for ${time}ms, at:`, stack);

    }, { threshold: 500 });
}

app.listen(8081);