const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseName: String,
    courseLink: String,
    courseDescription: String
})

module.exports = mongoose.model('Course', CourseSchema);