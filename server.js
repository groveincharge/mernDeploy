const express = require('express');
const mongoose = require('mongoose');
const concurrently = require('concurrently');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');
const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true})
.then(()=> console.log('MongoDB successfully connected ...'))
.catch(err => console.log(err));

app.use('./routes/api/items', items);

//serve static assets if in production mode.
if(process.env.NODE_ENV === 'production') {
             //Set static folder
       app.use(express.static('client/build'));
       app.get('*', (req, res) =>{
             res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
       })      
} else{
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server started on port ${port}`));
};