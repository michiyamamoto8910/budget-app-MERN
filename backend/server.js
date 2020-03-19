const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
// assign a port where the app can make requests, in my case I chose '5000'
const port = process.env.PORT || 5000;

// cors is used so different can receive resources from another domain.
// This allows localhost:3000 to receive from localhost:5000
// Let the app use cors() first to before any route to avoid cors policy blocking the requests
app.use(cors());
app.use(express.json());

//connection string from mongodb atlas
const ATLAS_URI = 'mongodb+srv://<username>:<password>@cluster0-du9jk.azure.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true});


const connection = mongoose.connection
connection.once('open', () =>{
    console.log("Connection to database is successful!")
})

// import routes
const itemRouter = require('./routes/item');
const categoryRouter = require('./routes/category');

// assign routes to specific paths
app.use('/items', itemRouter);
app.use('/categories', categoryRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})