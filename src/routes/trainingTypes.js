const { Router } = require("express");
const router = Router();
const TrainingTypes = require('../models/TrainingTypes');

// Routes
router.get('/', async (req, res) => {
    try {
        const trainingtypes = await TrainingTypes.find();
        res.json(trainingtypes);

    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/', async (req, res) => {
    const trainingtype = new TrainingTypes({
        trainingTypeName: req.body.trainingtypename
    })
    try {
        const savedTrainingtype = await trainingtype.save();
        res.json({ trainingtype: trainingtype._id });

    } catch (err) {
        res.json({ message: err })
    }
})

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;