const { Router } = require("express");
const router = Router();
const User = require('../models/User');
const TrainingTimes = require('../models/TrainingTimes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');


// Routes
// GETS ALL USERS
/**
 * @swagger
 *  /users:
 *    get:
 *      description: Gets all users data
 *      responses:
 *        200:
 *          description: Data was retrieved successfully
 *        500:
 *          description: Backend error   
 */
router.get('/', async (req, res) => {
    const users = await User.find(err => {
        if (err) {
            res.status(500).send('Backend error');
            return;
        }
    });
    res.status(200).json(users)
});

// GET ONE USER
/**
 * @swagger
 *   /users/{userID}:
 *     get:
 *       description: Get a user by id
 *       parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: Requires an id parameter to find the user
 *         schema:
 *           type: string
 *       responses:
 *         200:
 *           description: User was found, data is returned
 *         400: 
 *           description: Bad request, id not valid
 */
router.get('/:userID', async (req, res) => {

    try {
        const user = await User.findById(req.params.userID);
        res.status(200).json(user)
    }
    catch (e) {
        if (e instanceof Error) {
            // IDE type hinting now available
            // properly handle Error e
            console.log(e)
        }
        else {
            console.log(e)
        }
    }




})


// CREATES A USER
/**
 * @swagger
 *   /users:
 *     post:
 *       description: Creates a new user
 *       required: true 
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Requires an object
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *       responses:
 *         201:
 *           description: User was created successfully
 *         400: 
 *           description: Bad request, missing required data
 */
router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    const savedUser = await user.save(err => {
        if (!err) {
            res.status(201).json({ userID: user._id })
        }
        else {
            res.status(400).send('Bad request, missing required data')
        }
    });



})

// LOGS IN A USER
/**
 * @swagger
 *   /users/login:
 *     post:
 *       description: Logs in a user
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Requires an object
 *         required: true 
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *       responses:
 *         201:
 *           description: User was authenticated successfully, auth token is delivered
 *         400: 
 *           description: Bad request, missing required data
 *         401: 
 *           description: Access denied
 */
router.post('/login', async (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send('Bad request, request body cannot be empty')
    }
    if (!req.body.email) {
        return res.status(400).send('Bad request, email parameter is missing')
    }
    if (!req.body.password) {
        return res.status(400).send('Bad request, password parameter is missing')
    }

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).send("User does not exist");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).send('Password does not match');

    // JWT token 
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({ message: 'logged in, token delivered' });

})

// WILL UPDATE USERS TRANING TIMES
/**
 * @swagger
 *   /users/update:
 *     post:
 *       description: Updates users training time
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Requires an object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *             course:
 *               type: string
 *             training_type:
 *               type: string
 *             timespent:
 *               type: number
 *       responses:
 *         200:
 *           description: User's training time was updated successfully 
 *         400: 
 *           description: Bad request, missing required data
 *         
 */
router.post('/update', async (req, res) => {

    const trainingtimes = new TrainingTimes({
        user: req.body.user_id,
        course: req.body.course_id,
        training_type: req.body.trainingtype_id,
        timespent: req.body.timespent
    })

    try {
        const savedTimes = await trainingtimes.save();
        res.status(200).json({ times: savedTimes._id })
    } catch (err) {
        res.status(400).json(err.errors)
    }
})

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;