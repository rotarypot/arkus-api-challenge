const { Router } = require("express");
const router = Router();
const User = require('../models/User')

// Routes
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const savedUser = await user.save();
        res.json(savedUser);

    } catch (err) {
        res.json({ message: err })
    }
})

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;