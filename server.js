require('dotenv').config();
const {format} =  require('date-fns');
const {v4: uuid} = require('uuid');
const express = require('express')
const router = express.Router();
const {registerLogger} = require('./logEvents');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbconfig');
const {logger} = require('./controller/logEvents');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejs =  require('ejs');

///const cors = require('cors');

connectDB();

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', express.static(path.join(__dirname, '/public')));

app.use(logger);

app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/product',require('./routes/product'));
app.use('/delete',require('./routes/delete'));
app.use('/update',require('./routes/update'));


mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});