// import MongoClient from 'mongodb';
// const url = "mongodb+srv://admin:4155TripMaster@cluster0.aoxmt.mongodb.net/TripMaster?retryWrites=true&w=majority";
// const client = new MongoClient(url);    
// const db = client.db();

// async function connectToDB() {
//     try {
//         await client.connect();
        
//     } finally {
//         await client.close();
//     }
// }
// connectToDB().catch(console.dir);

window.onload = function(){


    $("#login").click(function(){
        $("#content").html(
        "<label for='email'>Email:</label><input type='text' id='email'><br>"+
        "<label for='password'>Password:</label><input type='password' id='password'><br>"+
        "<button id='login_button'>Login</button>");

        $("#login").css("background-color","#ddd");
        $("#login").css("color","rgb(53,53,53)");
        $("#new_user").css("background-color","rgb(53,53,53)");
        $("#new_user").css("color","#ddd");
        
        $("#login_button").click(function(){

            let email = $("#email").val();
            let password = $("#password").val();
            let form_data = {
                email: email,
                password: password
            };
            
            alert("Logging in...");
            alert(JSON.stringify(form_data));
            
        });


    });

    $("#login").css("background-color","#ddd");
    $("#login").css("color","rgb(53,53,53)");

    $("#login_button").click(function(){

        let email = $("#email").val();
        let password = $("#password").val();

        let form_data = {
            email: email,
            password: password
        };

        alert("Logging in...");
        alert(JSON.stringify(form_data));
    });

    $("#new_user").click(function(){
        $('#content').html(
        "<label for='firstName'>First Name:</label><input type='text' id='name'><br>"+
        "<label for='lastName'>Last Name:</label><input type='text' id='name'><br>"+
        "<label for='email'>Email:</label><input type='text' id='email'><br>"+
        "<label for='password'>Password:</label><input type='password' id='password'><br>"+
        "<label for='Cpassword'>Confirm Password:</label><input type='password' id='Cpassword'><br>"+
        "<button id='new_user_button'>Create Account</button>");

        $("#new_user").css("background-color","#ddd");
        $("#new_user").css("color","rgb(53,53,53)");

        $("#login").css("background-color","rgb(53,53,53)");
        $("#login").css("color","#ddd");

        $("#new_user_button").click(function(){
            var firstName = $("#firstName").val();
            var lastName = $("#lastName").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var form_data = {
                firstName:firstName,
                lastName: lastName,
                email:email,
                password:password
            };
            if (email){
                email = email.toLowerCase();
            }
            client.db("TripMaster").collection("Users").insertOne(form_data);
            
            
            // if(user.email){
            //     user.email = user.email.toLowerCase();
            // }
            // user.save()
            // .then(user=>{
            //     res.redirect('login.html');  
            // }) 
            // .catch(err=>{
            //     if(err.name === 'ValidationError' ) {
            //     req.flash('error', err.message);  
            //     return res.redirect('back');
            //     }
    
            //     if(err.code === 11000) {
            //     req.flash('error', 'Email has been used');  
            //     return res.redirect('back');
            //     }
            
            //     next(err);
            // }); 

            alert("new user created...\n");
            alert(JSON.stringify(form_data));


            




        });
    });


}