const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const uri = ('mongodb+srv://recipeDB:Passw0rd3@cluster0-h1g1p.mongodb.net/test?retryWrites=true&w=majority')

mongoose.connect(uri, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => console.log('MongoDB connection established successfully'));

app.use('/recipes', require('./routes/recipes'));

app.listen(3000, () => console.log('Server is running on port: 3000'));
