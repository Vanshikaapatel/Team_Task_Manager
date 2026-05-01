const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
    try {
        let { name, email, password } = req.body;


        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        let hash = await bcrypt.hash(password, 10);

        let user = await User.create({
            name,
            email,
            password: hash
        });

        res.json({
            message: "Signup successful",
            user: user
        });

    } catch (err) {
        console.log(err);
        res.json({ message: "Signup error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "User not found" });
        }

        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({ message: "Wrong password" });
        }

        let token = jwt.sign({ id: user._id }, "secret");

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (err) {
        console.log(err);
        res.json({ message: "Login error" });
    }
});

module.exports = router;