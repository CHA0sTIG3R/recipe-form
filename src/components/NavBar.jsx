import React from 'react';
import { Nav, Navbar, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


function NavBar() {

    return (
    <Navbar variant='dark' bg='dark' expand='lg' sticky='top'>
        <Container fluid>
            <Navbar.Brand href='/'>Recipe Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar-dark'/>
            <Navbar.Collapse id='navbar-dark'>
                <Nav className='me-auto'>
                    <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
                    <Nav.Link as={NavLink} to='/manager'>Manager</Nav.Link>
                    <Nav.Link as={NavLink} to='/manager/add'>Add New</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default NavBar