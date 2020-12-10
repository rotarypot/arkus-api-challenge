const mongoose = require('mongoose');

const TrainingSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    training_type: {
        type: mongoose.Schema.ObjectId,
        ref: 'TrainingType',
        required: true
    },
    timespent: Number

})

module.exports = mongoose.model('TrainingTimes', TrainingSchema);