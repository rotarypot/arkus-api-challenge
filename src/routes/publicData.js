const { Router } = require("express");
const User = require("../models/User");
const router = Router();

// Routes
/**
 * @swagger
 *  /publicdata:
 *    get:
 *      description: Gets all public data
 *      responses:
 *        200:
 *          description: Data was retrieved successfully
 */
router.get('/', async (req, res) => {

    const users = await User.find(err => {
        if (err) { res.status(500).send('Backend error') }
    })
        .populate('TrainingTimes')
        .populate({ path: 'TrainingTimes', populate: { path: 'course', select: 'courseName' } })
        .populate({ path: 'TrainingTimes', populate: { path: 'training_type', select: 'trainingTypeName' } })
    res.status(200).json(users);
})
module.exports = router;


