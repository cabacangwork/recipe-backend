const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const MONGOURL = ('mongodb+srv://recipeDB:Passw0rd3@cluster0-h1g1p.mongodb.net/test?retryWrites=true&w=majority')

mongoose.connect(MONGOURL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(() => console.log('Failed to Connect!'));

app.use('/recipes', require('./routes/recipes'));

const port = process.env.Port || 3000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
