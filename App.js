import React, { Component,  useEffect, useState} from "react"; 
import axios from 'axios'
import SymptomsV5 from './SymptomsV5';
import Register from './Register';
import Home from './Home';
import Error_Route from './Error_Route';
import NavBar from './NavBar';
import Map from './Map';
import Login from './Login';
import Logout from "./Logout";
import NavBarLogin from "./NavBarLogin";
import Profile from "./Profile";
import MapGL from 'react-map-gl'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {

  

  return (
    <Router>

      <div className = "container">

        
        

        <Routes>
          <Route element = {<NavBar />} >
          
            <Route path = "/home" element = {<Home />}/>
            <Route path = "/diagnosis" element = {<SymptomsV5 />}/>
            <Route path = "/map" element = {<Map prop = {"urgent care"}/> } />
            <Route path = "/logout" element = {<Logout />} />
            <Route path = "/profile" element = {<Profile />} />
            
            
          </Route>

          <Route element = {<NavBarLogin />}>
            <Route path = "/register" element = {<Register />}/>
            <Route path = "/" element = {<Login />} />
            <Route path = "/login" element = {<Login />} />
          </Route>

          <Route path = "*" element = {<Error_Route />} />
         

          
        </Routes>

        </div>
    </Router>
  );
}


export default App;


