const { Router } = require("express");
const router = Router();
const TrainingTypes = require('../models/TrainingTypes');
const logger = require('../logs/logger');

// Routes
/**
 * @swagger
 *  /trainingtypes:
 *    get:
 *      description: Gets all training types data
 *      responses:
 *        200:
 *          description: Data was retrieved successfully
 */
router.get('/', async (req, res) => {
    try {
        const trainingtypes = await TrainingTypes.find();
        res.json(trainingtypes);
        logger.info('Responded with all training types data');

    } catch (err) {
        res.json({ message: err })
        logger.error('Error while getting all training types data')

    }
});

/**
 * @swagger
 *   /trainingtypes:
 *     post:
 *       description: Creates a new training type
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Requires an object
 *         schema:
 *           type: object
 *           properties:
 *             trainingtypename:
 *               type: string
 *               required: true
 *       responses:
 *         201:
 *           description: Training type was created successfully
 *         400: 
 *           description: Bad request, missing required data
 */
router.post('/', async (req, res) => {
    const trainingtype = new TrainingTypes({
        trainingTypeName: req.body.trainingtypename
    })

    const savedTrainingtype = await trainingtype.save(err => {
        if (err) {
            res.status(400).send('Bad request');
            logger.error('Bad request trying to create a new Training Type')

        } else {
            res.status(201).json({ trainingtype: trainingtype._id });
            logger.info('New training type was created')
        }
    });
})

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;