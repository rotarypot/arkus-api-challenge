//SETUP SERVER
const express = require("express");
const app = express();
app.set('port', process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv/config');

//CONNECT TO db
const mongoose = require("mongoose");
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_CONNECTION, options).catch(error => console.log(error))

//SETUP ROUTES
const appRoutes = require('./routes/routes');
const usersRoutes = require('./routes/users');


app.use('/', appRoutes);
app.use('/users', usersRoutes);


// LAUNCH SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server alive on port ${process.env.PORT}`);
})