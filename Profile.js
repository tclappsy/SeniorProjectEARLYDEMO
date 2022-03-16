import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./Profile.css";



function Profile () {

    axios.defaults.withCredentials = true;
    const [username, setUsername] = useState('');
    const [user_id, setUserID] = useState('');

    const [selectedIssue, setSelectedIssue] = useState('');
    const [medicalDescription, setMedicalDescription] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/profile").then((response) =>  {
            if(response.data.loggedIn === true) {
                console.log('USER RESPONSE ' ,response.data.user[0].username);
                setUsername(response.data.user[0].username);
                setUserID(response.data.user[0].id);

            } else {
                setUsername("USER NOT LOGGED IN");
            }
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/profile").then((response) => {
            
            if(response.data.loggedIn === true) {
                console.log('user logged in, will fetch data...');
                console.log(response);
                
            } else {
                console.log('user not logged in');
            }
        })
    }, [])

    return (
        <div>
            <div className = "welcome_message">
                <h4>Welcome, <i>{username}#{user_id}</i></h4>
            </div>
              
        </div>
    );
}

export default Profile;