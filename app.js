var express = require('express');
path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');

//initialize trip collection later
// const {initCollection} = require('./models/connection');


//app creation
const app = express();

//configuration
const PORT = process.env.PORT || 4000;
let host = 'localhost';
let url = "mongodb+srv://admin:4155TripMaster@cluster0.aoxmt.mongodb.net/TripMaster?retryWrites=true&w=majority";
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//create session for user, save for later
app.use(session({
    secret: 'jl2k4j51hjkah4',
    store: new MongoStore({mongoUrl: "mongodb+srv://admin:4155TripMaster@cluster0.aoxmt.mongodb.net/TripMaster?retryWrites=true&w=majority"}),
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 60*60*1000}
}));

app.use(flash());

//global variables
app.use((req, res, next)=>{
    console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.name = req.session.name || 'Guest';
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

mongoose.connect("mongodb+srv://admin:4155TripMaster@cluster0.aoxmt.mongodb.net/TripMaster?retryWrites=true&w=majority", {})
.then(()=> {
    app.listen(PORT, ()=>{
        console.log('Server is running on port', PORT);
    });
})
.catch(err => console.log(err.message));

app.use('/trips', tripRoutes);

app.use('/user', userRoutes);

app.get('/', (req, res, next)=>{    
        res.render('index');        
});

// app.get('/profile', (req, res, next)=>{
//     res.render('profile');
// });

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err})
});