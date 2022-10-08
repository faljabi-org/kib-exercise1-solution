const express = require('express');

const validate = require('../middlewares/validate-request');
const schemas = require('../data-managers/users/validation-schemas');
const UsersDataManager = require('../data-managers/users/users-data-manager');
const ApiError = require('../dtos/ApiError');

const router = express.Router();

router.post('/reset', validate(schemas.reset.body, 'body'), async (req, res, next) => {

    try {

        let { guid } = req.body;

        let reset = await UsersDataManager.reset();

        res.status(201).send({
            result: reset,
            guid
        });

        return next();
    }
    catch (error) {

        return next(ApiError.internal(error.message));
    }
});

router.get('/', validate(schemas.search.query, 'query'), async (req, res, next) => {

    try {

        let { guid } = req.query;
        
        let users = await UsersDataManager.searchUsers();

        res.send({
            result: users,
            guid
        });
    }
    catch (error) {

        return next(ApiError.internal(error.message));
    }
});

router.put('/', validate(schemas.put.body, 'body'), async (req, res, next) => {

    try {

        let { guid, ...input } = req.body;

        let upserted = await UsersDataManager.upsertUser(input);

        res.status(201).send({
            result: upserted,
            guid
        });

        return next();
    }
    catch (error) {

        return next(ApiError.internal(error.message));
    }
});

router.delete('/:id', validate(schemas.delete.params, 'params'), validate(schemas.delete.body, 'body'), async (req, res, next) => {

    try {

        let { id } = req.params;
        let { guid, ...input } = req.body;

        let deleted = await UsersDataManager.deleteUser({
            id,
            ...input
        });

        res.send({
            result: deleted,
            guid
        });

        return next();
    }
    catch (error) {

        return next(ApiError.internal(error.message));
    }
});

module.exports = router;