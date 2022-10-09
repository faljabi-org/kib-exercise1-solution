const Joi = require('joi');

const validationSchemas = {
    reset: {
        body: _ => Joi.object({
            guid: Joi.string()
                .guid()
                .required()
        })
    },
    search: {
        query: _ => Joi.object({
            guid: Joi.string()
                .guid()
                .required()
        })
    },
    put: {
        body: _ => Joi.object({
            id: Joi.string()
                .trim()
                .guid()
                .required(),
            name: Joi.string()
                .trim()
                .max(100)
                .required(),
            username: Joi.string()
                .trim()
                .max(30)
                .required(),
            email: Joi.string()
                .trim()
                .max(55)
                .email()
                .required(),
            phone: Joi.string()
                .trim()
                .max(30)
                .required(),
            website: Joi.string()
                .trim()
                .allow('')
                .max(100)
                .required(),
            company: Joi.object({
                name: Joi.string()
                    .trim()
                    .max(100)
                    .required(),
                catchPhrase: Joi.string()
                    .trim()
                    .allow('')
                    .max(100)
                    .required(),
                bs: Joi.string()
                    .trim()
                    .allow('')
                    .max(100)
                    .required()
            }),
            address: Joi.object({
                city: Joi.string()
                    .trim()
                    .max(100)
                    .required(),
                street: Joi.string()
                    .trim()
                    .max(100)
                    .required(),
                suite: Joi.string()
                    .trim()
                    .allow('')
                    .max(100)
                    .required(),
                zipcode: Joi.string()
                    .trim()
                    .allow('')
                    .max(10)
                    .required(),
                geo: Joi.object({
                    lat: Joi.string()
                        .trim()
                        .max(100)
                        .required(),
                    lng: Joi.string()
                        .trim()
                        .max(100)
                        .required()
                })
                    .required()
            })
                .required(),
            guid: Joi.string()
                .guid()
                .required()
        })
    },
    delete: {
        params: _ => Joi.object({
            id: Joi.string()
                .guid()
                .required(),
        }),
        body: _ => Joi.object({
            guid: Joi.string()
                .guid()
                .required()
        })
    }
}

module.exports = validationSchemas;