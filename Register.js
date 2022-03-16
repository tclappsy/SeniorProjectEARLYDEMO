import React, {useState} from "react";
import Axios, { axios } from 'axios'
import "./Register.css"


function Register () {

    //need to grab info from username and password and validate it
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const [registerStatus, setRegisterStatus] = useState('');

    const REGISTER_HANDLER = 'User Registered!';

    Axios.defaults.withCredentials = true;

    //function that sends username,passwrod data to backend
    const register = () => {
        Axios.post('http://localhost:5000/register',{
            email:email,
            username: username,
            password:password,
            age:age
        }).then((response) => {

            if(response.data.message === REGISTER_HANDLER) {
                //grabs message sent from back end to display in front end, populated in setRegisterStatus
                setRegisterStatus(response.data.message);
                console.log('registered!');
                window.location.href = "http://localhost:3000/login";
                
            } else {
                console.log('not registered');
                setRegisterStatus(response.data.message);
                
            }

            console.log('RESPONSE:', response);
        });
    }

    return (

        <div>
            <div className = "registration">
                

                
            
            <div className = "register_wrapper">

                <i><strong><h3 className = "register_header">Register Here</h3></strong></i>
                <label className = "label_header">Email</label>
                <input type = "text" onChange = {(e) =>{setEmail(e.target.value)}}></input>

                <br></br>

                <label className = "label_header">Username</label>
                <input type = "text" onChange = {(e) =>{setUsername(e.target.value)}}></input>

                <br></br>

                <label className = "label_header">Password</label>
                <input type = "password" onChange = {(e) =>{setPassword(e.target.value)}}></input>

                <br></br>

                <label className = "label_header">Age</label>
                <input type = "number" onChange = {(e) =>{setAge(e.target.value)}}></input>

                <br></br>

                <button onClick = {register} className = "register_button">Register</button>
                <br></br>
            </div>

            <br></br>

            <i><strong><h3 className = "register_status">{registerStatus}</h3></strong></i>
            <hr></hr>
               
               
            </div>

            

            
            
        </div>
    )

}

export default Register;