const { Router } = require("express");
const router = Router();
const Course = require('../models/Course');

// Routes
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);

    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/', async (req, res) => {
    const course = new Course({
        courseName: req.body.coursename,
        courseLink: req.body.courselink,
        courseDescription: req.body.coursedescription
    })
    try {
        const savedCourse = await course.save();
        res.json({ course: course._id });

    } catch (err) {
        res.json({ message: err })
    }
})

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;