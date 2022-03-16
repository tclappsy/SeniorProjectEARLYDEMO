import React, {useEffect, useState} from "react";
import axios from 'axios'
import "./NavBar.css"
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Container } from 'react-bootstrap';


function NavBar () {

 
return (
    <div>

        <div className = "navbar">
            <>
            <Navbar className = "pt-3" fluid bg="dark" variant="dark" fixed = "top" bsPrefix = "navbar">
                <Container>
                <Navbar.Brand href="/home">Imperial Health</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/diagnosis">Diagnosis</Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
    
            </>
        </div>

        <Outlet />
    </div>
)
}
    
export default NavBar;