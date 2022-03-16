import React from "react";
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Container } from 'react-bootstrap';

function NavBarLogin() {
    return (
        <div>
    
            <div className = "navbar">
                <>
                <Navbar className = "pt-3" fluid bg="dark" variant="dark" fixed = "top" bsPrefix = "navbar">
                    <Container>
                    <Navbar.Brand href="/login">Imperial Health</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
        
                </>
            </div>
    
            <Outlet />
        </div>
    )
}

export default NavBarLogin;