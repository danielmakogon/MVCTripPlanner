const model = require('../models/tripModel');
const User = require('../models/userModel');

exports.index = (req, res) => {
    return res.render('trips');
}

exports.create = (req, res, next) => {
    
    let trip = new model(req.body);
    trip.tripCreator = req.session.user;
    trip.save()
    .then(trip =>{
        console.log('trip created!');
        res.redirect('../user/profile');
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            console.log('error', err.message);  
            return res.redirect('back');
        }

        if(err.code === 11000) {
            console.log('error', 'Email has been used');  
            return res.redirect('back');
        }
        
        next(err);
    });
}

exports.profile = (req, res) => {
    return res.render('profile');
}

exports.getTrip = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(trip =>{
        if(trip){
            res.render('trip', {trip});
        }
    })
    .catch(err=>next(err));
}

exports.getExplore = (req, res, next) => {
    res.render('explore');
}