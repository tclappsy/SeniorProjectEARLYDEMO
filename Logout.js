import React, {useEffect, useState} from "react";
import axios from 'axios'
import "./Logout.css"




function Logout() {

    const [logoutStatus, setLogoutStatus] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;

    // axios.get('http://localhost:5000/logout').then((response) => {
    //     console.log(test);
    // })

    const logout = () => {

        
        axios.get('http://localhost:5000/logout').then((response) => {

        console.log(response);
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
                 setLogoutStatus(response.data.message);
 
                 window.location.href = "http://localhost:3000/login";
             }
        })
     }

     useEffect(() => {
        axios.get("http://localhost:5000/login").then((response) =>  {
            if(response.data.loggedIn === true) {
                setLoginStatus("User logged in: " + '[' + response.data.user[0].username + ']');
                console.log('USER RESPONSE ' ,response);
            }
        })
    }, [])

    return(
        <div>
            <div className = "logout_message">
                <h3>Are you sure you want to log out? </h3>
                {/* <p>Click <a href = "/login" className = "login_redirect">here</a> to log back in</p> */}
            </div>
            
            <div className = "logout_button">
                <button onClick = {logout}>Logout</button>
                <p>{logoutStatus}</p>
            </div>

            <i><strong><h3 className = "login_status">{loginStatus}</h3></strong></i>
        </div>

    )
}

export default Logout;