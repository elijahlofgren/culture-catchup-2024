// @ts-check

const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Define a schema
const schema = Joi.object({
    user_id: Joi.number().integer().positive().required(),
});

module.exports = (db) => {
    router.get('/get-voter', async (req, res) => {

        // Validate request query parameters
        const { value: validatedQueryParams, error } = schema.validate(req.query);
        if (error) {
            // If validation fails, return a 400 response with the error message
            return res.status(400).send(error.details[0].message);
        }

        try {
            const query = `SELECT first_name FROM users u WHERE u.id = ? LIMIT 1`;
            const [rows] = await db.query(query, [validatedQueryParams.user_id]); // Pass parameters as an array
            res.json(rows[0]);

        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
        }

    });

    return router;
};
