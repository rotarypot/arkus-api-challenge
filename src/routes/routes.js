const { Router } = require("express");
const router = Router();

// Routes
router.get('/', (req, res) => {
    res.send("We are home..")
});
router.get('/test', (req, res) => {
    res.send("Test endpoint here..")
});

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;