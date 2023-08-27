require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes'); 
const eventRoutes = require('./routes/eventRoutes'); 

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to db and listening on port ${PORT}`);
        });
    })
    .catch(err => console.log(err))

app.use('/auth', authRoutes);

app.use('/events', eventRoutes);c