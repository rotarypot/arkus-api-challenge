const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
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