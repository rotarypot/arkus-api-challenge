const { Router } = require("express");
const router = Router();
const logger = require('../logs/logger');
// Routes
router.get('/', (req, res) => {
    logger.info('API responding')
});

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;