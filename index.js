const express = require('express');
const request = require('request');
const cors = require("cors");
const mysql = require('mysql');


//password encryption librry import
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const saltRounds = 10;

//cookie import 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

//connection
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'password',
    database:'imperial_health'
});

//auto parses info to json from front end
app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000'], //finds local host set to port
    methods: ["GET", "POST"], //enbles cookies for get and post requests
    credentials: true //this has to be set to true
}));


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//uses the cookie
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


//creation of the session
app.use(session({
    key:"userId",
    secret: "senior",
    credentials: 'include',
    resave:false,
    saveUninitialized: false,
    cookie: {
        // expires: 60 * 60 * 24, //session lasts for 24 hours
        expires:  86400000,
        //secure:!true
    },
}))

app.post('/register', (req,res,result) => {
    
    //grab username and password fields from front end
    //make sure var names are same as in front end (see register function username(THIS):username)
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age; //added age param for DB
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    

    //check to see if inputs are empty if so display message

    db.query("SELECT * FROM user WHERE username = ?;", [username],(err,result) => {

        if(err) {
            console.log(err);
            res.send({err:err});
        } 

        if(result.length !== 0) {
            console.log('user exists already')
            res.send({message:'username taken'});
        } else {
            if(req.body.email === '' || req.body.password === '' || req.body.username === '' || req.body.age === '') {
    
                //sends message to console to be picked up from front end
                //console.log('user NOT registered');
                res.send({message:'Error: One or more inputs are empty'})
        
                } else {
        
                    //ensures password is > 6
                    if(req.body.password.length < 6) {
                        //console.log('password must be greater than 6 characters');
                        res.send({message:'Password must be greater than 6 characters'});
                    } else {
        
                        //encrypts password, inside param it takes password then saltrounds, instead of passing password we pass hash
                        bcrypt.hash(password,saltRounds, (err, hash) => {
                            if(err) {
                                res.send({err:err});
                            }
        
                            
                            //console.log(date);
                            
                            //example here of hash being passed as password
                            db.query("INSERT INTO user (email, username, password, age, register_date) VALUES (?,?,?,?,?)", [email, username, hash,age,date],
                                (err,result) => {
                                    if(err) {
                                        res.send({err:err});
                                    }
                                }
                                
                            );
                            
                            //logs if user is registered
                            console.log('user registered'); 
                            //sends a message to console so it can be parsed to front end 
                            res.send({message:"User Registered!"});
                            
                        })
                    }
                    }
        }
    })
})

//lets the server know a session is in progress, loggedIn is set to TRUE, the user is set to the current session
app.get("/login", (req,res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
        
    } else {
        res.send({loggedIn: false});
    }
});

app.get("/profile", (req,res) => {

    const userID = req.body.userID;

    
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user});

        const user_id =  req.session.user[0].id;

        const test = db.query("SELECT * FROM user_history WHERE user_id = ?;",
        [user_id],
        (err,result) => {
            if(err) {
                console.log(err);
                res.send({err:err});
            }

            console.log('result: ', result);
        })

    } else {
        res.send({loggedIn: false});
    }
});

app.get("/diagnosis", (req,res) => {
    
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})

    } else {
        res.send({loggedIn: false});
    }
});

app.post('/login', (req,res) => {

    //grab username and password fields from front end
    //make sure var names are same as in front end (see register function username(THIS):username)

    const username = req.body.username;
    const password = req.body.password;
    var login_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if(req.body.username == '' || req.body.password == '') {
        console.log('one or more inputs are empty')
        res.send({message:'Username or password is empty'});
    } else {

      


        db.query("SELECT * FROM user WHERE username = ?;",
        [username],
        (err,result) => {

            
            //if there an err then log the error
            if(err) {
                console.log(err);
                res.send({err:err});
            }
            
            //if result has been returned (aka if it exists in DB)
            if(result.length > 0) {
                // res.send(result); //send the object 
                //compares encrypted passsword to current password
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        //start session
                        req.session.user = result;
                        console.log(req.session.user);
                        console.log('username-->', result[0].username);
                        
                        res.send(result)

                        //send username to loal storage
                       
                    } else {
                        res.send({message: "username/password is incorrect..."});
                    }
                });
                //console.log('success!');
                console.log('SESSION ID', req.session.sessionID);
            } else { 
                res.send({message: "User does not exist"}); //error statement
                console.log('Username/Password is incorrect');
            }     
        }

        

    );
    }
})

app.post('/diagnosis', (req,res) => {

    //res.send({test: "test"});

    //vars from front(state) end need to be sent here to back end
    const user_id = req.body.user_id;
    const selected_issue = req.body.singleIssue;
    const symptoms = req.body.symptoms;
    const specialist = req.body.specialist;
    const med_desc = req.body.med_desc;
    let date = req.body.date;
    let symptoms_string = symptoms.toString();
    let specialist_JSON = JSON.stringify(specialist);
    date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    db.query("INSERT INTO user_history (user_id, selected_issue,medical_description,saved_date,specialist,symptoms) VALUES (?,?,?,?,?,?)", [user_id, selected_issue, med_desc,date,specialist_JSON, symptoms_string],
        (err, result) => {
            if(err) {
                console.log('an error occured')
                res.send({err:err});
                console.log(err);
            } else {
                console.log('success!');
                
            }

            res.json(result);

            console.log('result -->', result);
        })

        console.log('RES ', res);
})

app.get('/logout', (req,res) => {    

    var user_session = req.session.user;
    
    if(req.session.user) {
        req.session.destroy(function(err) {
            
            
            //destory cookie
            res.clearCookie('userId');
            //res.redirect('/poop');

            console.log('logged out!');
            res.send({message:"Logged out..."});
        })
       
    } else {
        console.log('no user logged in');
        console.log('USER: ', user_session);
    }
})

app.get('/check_session', (req,res) => {
    var user_session = req.session.user;

    //res.redirect('/poop');

    if(user_session == undefined) {
        console.log('no session');
        //res.redirect('/logout');
    } else {
        console.log('session in progress');
        console.log(user_session);
    }
})

//SYMPTOMS
const SYMPTOM_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5hdG8yNTI3QHlhaG9vLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTY2NyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOS0xMCIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjQ3MzcyMzc3LCJuYmYiOjE2NDczNjUxNzd9.mePDQvOgF7uAfSN7nsWjG3cu3GzKL5WHjCJVswiR_wE';
const SYMPTOM_URL = 'https://sandbox-healthservice.priaid.ch/symptoms?token=' + SYMPTOM_TOKEN + '&format=json&language=en-gb';

app.get("/symptoms", (req,res) => {
    request(SYMPTOM_URL,
        function(error,response,body) {
            
            if(!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);
                var symptom_data = parsedBody;
                res.send(JSON.stringify(symptom_data));
            }
           
        }
    );
})



app.listen(5000, () => {console.log("App listening on port 5000")});



