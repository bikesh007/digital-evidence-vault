const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/Users");

const router = express.Router();


// REGISTER USER

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        // CHECK EXISTING USER

        let user =
        await User.findOne({ email });

        if (user) {

            return res.status(400).json({
                msg: "User already exists"
            });
        }

        // HASH PASSWORD

        const salt =
        await bcrypt.genSalt(10);

        const hashedPassword =
        await bcrypt.hash(password, salt);

        // CREATE USER

        user = new User({

            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        // CREATE JWT TOKEN

        const payload = {

            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(

            payload,

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            },

            (err, token) => {

                if (err) throw err;

                res.json({
                    token
                });
            }
        );

    } catch (error) {

        console.error(error.message);

        res.status(500).send("Server Error");
    }
});


// LOGIN USER

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // FIND USER

        const user =
        await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                msg: "Invalid Credentials"
            });
        }

        // CHECK PASSWORD

        const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                msg: "Invalid Credentials"
            });
        }

        // CREATE JWT

        const payload = {

            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(

            payload,

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            },

            (err, token) => {

                if (err) throw err;

                res.json({
                    token
                });
            }
        );

    } catch (error) {

        console.error(error.message);

        res.status(500).send("Server Error");
    }
});

module.exports = router;