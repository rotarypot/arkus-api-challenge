//SETUP SERVER
const express = require("express");
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: 'auth-token' }));
require('dotenv/config');
const swaggerDocs = require('swagger-jsdoc');
const swaggerExpress = require('swagger-ui-express');
const logger = require('./logs/logger')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Arkus Challenge API',
            description: 'Documentation for the Arkus Challenge API',
            contact: {
                name: 'Ulises Legarreta',
                email: 'legarul@arkusnexus.com'
            }
        }
    },
    apis: ['./src/routes/*.js']
}

const swaggerDocumentation = swaggerDocs(swaggerOptions);
app.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(swaggerDocumentation));

//CONNECT TO db
const mongoose = require("mongoose");
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_CONNECTION, options).catch(error => console.log(error))

//SETUP ROUTES
const appRoutes = require('./routes/routes');
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const trainingRoutes = require('./routes/trainingTypes');
const publicDataRoutes = require('./routes/publicData');

app.use('/', appRoutes);
app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/trainingtypes', trainingRoutes);
app.use('/publicdata', publicDataRoutes);

// LAUNCH SERVER
app.listen(process.env.PORT, () => { logger.info('Server up..') })