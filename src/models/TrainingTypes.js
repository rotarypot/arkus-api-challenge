const mongoose = require('mongoose');

const TrainingTypesSchema = mongoose.Schema({

    trainingTypeName: String

})

module.exports = mongoose.model('TrainingType', TrainingTypesSchema);