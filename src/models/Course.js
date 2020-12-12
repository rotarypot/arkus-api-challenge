const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseName: { type: String, required: true },
    courseLink: { type: String, required: true },
    courseDescription: { type: String, required: true }
})

module.exports = mongoose.model('Course', CourseSchema);