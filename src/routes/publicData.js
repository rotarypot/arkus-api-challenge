const { Router } = require("express");
const User = require("../models/User");
const router = Router();

// Routes
router.get('/', async (req, res) => {

    const users = await User.find()
        .populate('TrainingTimes')
        .populate({ path: 'TrainingTimes', populate: { path: 'course', select: 'courseName' } })
        .populate({ path: 'TrainingTimes', populate: { path: 'training_type', select: 'trainingTypeName' } })

    res.json(users)

})
module.exports = router;