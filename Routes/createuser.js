const express = require('express');
const router = express.Router();
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
router.post('/register',
    [
        body('email', 'Invalid Email').isEmail(),
        body('password')
            .isLength({ min: 6 }).withMessage('Password must be greater than 6 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
            .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
        body('name', 'Username less than 5 characters').isLength({ min: 5 }),
        body('phone', 'Invalid Phone Number').isLength({ min: 10, max: 10 }),
        body('cpassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const existingUser = await user.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.phone }]
        });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        await user.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            cpassword:req.body.cpassword

        }).then(() => { res.send({ success: true }); }).catch((error) => {
            console.log(error);
            res.send({ success: false });
        })
    })
module.exports = router;