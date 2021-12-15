const model = require('../models/userModel');
const trip = require('../models/tripModel');
const flash = require('connect-flash');


exports.getLogin = (req, res) => {
    return res.render('login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    console.log(email);
    if(email)
        email.toLowerCase();
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            res.redirect('/user/');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if (result) {
                    req.session.user = user._id;
                    req.session.name = user.firstName + ' ' + user.lastName;
                    res.redirect('/user/profile');
                    console.log(req.session.name);
                    console.log(req.session);
            } else {
                req.flash('error', 'Wrong Password');
                res.redirect('/user/');
            }
            });     
        }     
    })
    .catch(err => next(err));
    
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else{
            res.redirect('/');   
        }          
    });
 };

exports.create = (req, res, next)=>{

    let user = new model(req.body);//create a new story document
    if(user.email){
        user.email = user.email.toLowerCase();
    }
    user.save()//insert the document to the database
    .then(user=>{
            res.redirect('/user/');  
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



};

exports.newUser = (req, res) => {
    return res.render('newUser');
}

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([model.findById(id), trip.find({tripCreator: id})]) 
    .then(results=>{
        const [user, trips] = results;
        res.render('profile', {user, trips});
    })
    
}

exports.getFriends  = (req, res, next) => {
    let userFriendData = [];
    let userFriends = [];

    model.findById(req.session.user)
    .then(user => {
        if (user){
            userFriends = user.friends;
            if(userFriends.length > 0){
                new Promise((resolve, reject) => {
                    let counter = 0;
                    for (let i = 0; i < userFriends.length; i++){
                        model.findById(userFriends[i])
                        .then(friend =>{
                            userFriendData.push(friend);
                            counter++;
                            if (counter == userFriends.length){
                                resolve(userFriendData);
                            }
                        })
                        .catch(err=>next(err));
                    }
                })
                .then(result=>{
                    res.render('friends', {user, userFriendData, userFriends});
                })
                .catch(err=>next(err));
                      
            }
            else{
                userFriendData=[];
                model.findById(req.session.user)
                        .then(result =>{
                            res.render('friends', {user, userFriendData, userFriends})
                        })
                        .catch(err=>next(err));
            }
        }
        else{
            //not a user msg
        }
    })
    .catch(err=>next(err))
}

exports.addFriends = (req, res, next) => {
    let friendInfo = req.body.friendEmail;
    model.findOne({ email: friendInfo })
    .then(friend=>{
        if(friend){
            console.log('user first name: ' + friend.firstName);
            if(req.session.user != friend.id){
                    Promise.all([model.findByIdAndUpdate(req.session.user, {$push: {friends: friend.id}}), model.findByIdAndUpdate(friend.id, {$push: {friends: req.session.user}})])
                    .then(result =>{
                        if (result){
                            res.redirect('/user/friends');
                        }
                    })
                    .catch(err=>next(err));
                
            }
            else {
                console.log('cannot add yourself as a friend');
                req.flash('error', 'Cannot add yourself as a friend');
            }
        }
        else{
            req.flash('error', 'Cannot find that friend');
            console.log('Cannot find that friend');
            res.redirect('back');
        }
    })
    .catch(err=>next(err));
        
}
