const { Router, response } = require("express");
const router = Router();
const Course = require('../models/Course');
const logger = require('../logs/logger')

// Routes
/**
 * @swagger
 *  /courses:
 *    get:
 *      description: Gets all courses data
 *      responses:
 *        200:
 *          description: Data was retrieved successfully
 */
router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.json(courses)
    logger.info('Responded with all courses data')
})


// Routes

/**
 * @swagger
 *   /courses:
 *     post:
 *       description: Creates a new training course
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Requires an object
 *         schema:
 *           type: object
 *           properties:
 *             coursename:
 *               type: string
 *             courselink:
 *               type: string
 *             coursedescription:
 *               type: string
 *       responses:
 *         201:
 *           description: Course was created successfully
 *         400: 
 *           description: Bad request, missing required data
 */

router.post('/', async (req, res) => {
    const course = new Course({
        courseName: req.body.coursename,
        courseLink: req.body.courselink,
        courseDescription: req.body.coursedescription
    })
    const savedCourse = await course.save(err => {
        if (err) { res.status(400).send('Bad request') }
        else {
            res.status(201).send({ course: course._id });
            logger.info('New course was created')
        }
    })


})

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;