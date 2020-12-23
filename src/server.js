//SETUP SERVER
const express = require("express");
const cors = require('cors');
const totoro = require('totoro-node');
const app = express();
app.set('port', process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: 'auth-token' }));
require('dotenv/config');

const logger = require('./logs/logger')

const swaggerExpress = require('swagger-ui-express');

const options = {
    explorer: true,
    swaggerOptions: {
        urls: [
            {
                url: 'http://localhost:4000/swagger.json',
                name: 'Arkus API Version 1'
            },
            {
                url: 'http://localhost:4000/swaggerv2.json',
                name: 'Arkus API Version 2'
            }
        ]
    }
}
app.use(express.static('src/public'));
app.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(null, options));

//CONNECT TO db
const mongoose = require("mongoose");
const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_CONNECTION, mongooseOptions)
    .then(db => {
        logger.info('DB connected ');
        return;
    },
        rej => {
            logger.error('DB failed to connect');
            return;
        })
    .catch(error => console.log(error))

//SETUP ROUTES
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const trainingRoutes = require('./routes/trainingTypes');
const publicDataRoutes = require('./routes/publicData');

app.use('/api', totoro.rain({

    v1: {
        endpoints: [
            {
                route: "/users",
                method: "GET",
                implementation: usersRoutes.getUsers
            },
            {
                route: "/users/:userID",
                method: "GET",
                implementation: usersRoutes.getUserById
            },
            {
                route: "/users/update",
                method: "POST",
                implementation: usersRoutes.updateUser
            },
            {
                route: "/users/login",
                method: "POST",
                implementation: usersRoutes.loginUser
            },
            {
                route: "/users",
                method: "POST",
                implementation: usersRoutes.createUsers
            },
            {
                route: "/users/training/:id",
                method: "DELETE",
                implementation: usersRoutes.deleteTraining
            },
            {
                route: "/courses",
                method: "GET",
                implementation: coursesRoutes.courses
            },
            {
                route: "/courses",
                method: "POST",
                implementation: coursesRoutes.createCourse
            },
            {
                route: "/trainingtypes",
                method: "GET",
                implementation: trainingRoutes.trainingtypes
            },
            {
                route: "/trainingtypes",
                method: "POST",
                implementation: trainingRoutes.createTraining
            },
            {
                route: "/publicdata",
                method: "GET",
                implementation: publicDataRoutes.publicData
            }
        ]
    }

}))
// LAUNCH SERVER
app.listen(process.env.PORT, () => { logger.info('Server is up...') })