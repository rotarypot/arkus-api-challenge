const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

UserSchema.virtual('TrainingTimes', {
    ref: 'TrainingTimes',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})
module.exports = mongoose.model('User', UserSchema);