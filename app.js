require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: true }));
app.use(cors({
    credentials: true,
    origin: process.env.URL
}));

app.use((_req, res, next) => { // This is made in order to avoid CORS error on the front-end side
    res.setHeader('Access-Control-Allow-Origin', '*'); // Second argument allows you to control whick domains should have access. In order to open it to any domain, take '*'
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // This controls which headers incoming requests may have, so that they are handled 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

const quotesRoute = require('./routes/quotesRoute');
const authRoute = require('./routes/authRoute');

app.use('/quote', quotesRoute);
app.use('/auth', authRoute);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
})
.then(() => {
    app.listen(process.env.PORT || 5555, () => {
        console.log(`Running on ${process.env.PORT}`);
    });
});

