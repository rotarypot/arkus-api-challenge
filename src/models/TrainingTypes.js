const mongoose = require('mongoose');

const TrainingTypesSchema = mongoose.Schema({

    trainingTypeName: { type: String, required: true }

})

module.exports = mongoose.model('TrainingType', TrainingTypesSchema);