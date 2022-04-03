import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



export const Header = () => {

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">Game catalog</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/games">Games</Nav.Link>
                        <Nav.Link href="/platforms">Platforms</Nav.Link>
                        <Nav.Link href="/card">Card</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;