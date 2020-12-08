const mongoose = require('mongoose');

const TrainingSchema = mongoose.Schema({

    user_id: String,
    course_id: String,
    trainingtype_id: String,
    timespent: Number

})

module.exports = mongoose.model('TrainingTimes', TrainingSchema);