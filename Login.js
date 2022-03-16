import React, {useEffect, useState} from "react";
import axios from 'axios'
import "./Login.css";
import "./NavBar.js";


function Login() {


    const [username_login, setUsername_login] = useState('');
    const [password_login, setPassword_login] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;

    

    const login = () => {
        axios.post('http://localhost:5000/login',{
            username: username_login,
            password:password_login
        }).then((response) => {

            //adds username to local storage (EXPIERMENTING WITH THIS) (key, object to be inserted)
            localStorage.setItem('Imperial Health Username', username_login);
            if(response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus('Welcome, ' + response.data[0].username)
                window.location.href = "http://localhost:3000/home";
            }

            
            //FIRST LINE IN CONSOLE
            console.log(response);
            console.log("MESSAGE: " , response.data);
        });
    }

    const logout = () => {
       axios.get('http://localhost:5000/logout').then((response) => {

            //removes username from localstorage 
            localStorage.removeItem('Imperial Health Username');

            console.log('logout button clicked');
            console.log('LOGOUT RESPONSE', response);

            if(response.data.loggedIn === true) {
                console.log('user is logged in');
                console.log('LOGGED IN: ', response.data.loggedIn);
                
            } else {
                console.log('user is NOT logged in');
                console.log('LOGGED IN: ', response.data.loggedIn);
                setLoginStatus(response.data.message);

                window.location.href = "http://localhost:3000/logout";
            }
       })
    }

    const check = () => {
        axios.get('http://localhost:5000/check_session').then((response) => {
             console.log('check clicked');
             console.log('CHECK -> ', response);
        })

        console.log('clicked');
     }

   


    useEffect(() => {
        axios.get("http://localhost:5000/login").then((response) =>  {
            if(response.data.loggedIn === true) {
                setLoginStatus("User logged in: " + '[' + response.data.user[0].username + ']');
                console.log('USER RESPONSE ' ,response);
            }
        })
    }, [])

    

   
    return (
        <div>
            <div className = "login_container">

                <div className = "login_wrapper">
                <u><i><strong><h3 className = "login_header">Login</h3></strong></i></u>
                <label className = "label_header">Username</label>
                <input type = "text"  onChange = {(e) =>{setUsername_login(e.target.value)}}></input>

                <br></br>

                <label className = "label_header">Password</label>
                <input type = "password" onChange = {(e) =>{setPassword_login(e.target.value)}}></input>

                <br></br>
                <button onClick = {login} className = "login_button">Login</button>
                

                <i><strong><h3 className = "login_status">{loginStatus}</h3></strong></i>
                {/* <button onClick = {logout}>Logout</button> */}

                <button onClick = {check}>Check status</button>

                <p>Dont have an account? Click <a href = "/register">Here</a> to get started!</p>
                </div>

                <br></br>
                <hr></hr>
                
            </div>

           

            
        </div>
    )
}

export default Login;