const { Router } = require("express");
const router = Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');



// Routes
// GETS ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (err) {
        res.json({ message: err })
    }
});


// CREATES A USER
router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await user.save();
        res.json({ user: user._id });

    } catch (err) {
        res.json({ message: err })
    }
})

// LOGS IN A USER
router.post('/login', async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("User does not exist");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Password does not match');

    // JWT token 
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send("user is logged in, token delivered");

})

// WILL UPDATE USERS TRANING TIMES
router.post('/update', verify, (req, res) => {
    res.send("auth is correct, you can update stuff")
})


// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;