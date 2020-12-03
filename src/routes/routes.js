const { Router } = require("express");
const router = Router();

// Routes
router.get('/', (req, res) => {
    res.send("We are home..")
});

// EXPORT SO WE USE THEM FROM SOMEWHERE ELSE.
module.exports = router;