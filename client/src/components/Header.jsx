import React from 'react'
import {Nav, Navbar, Container} from "react-bootstrap"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar expand="lg" >
      <Container>
        <Navbar.Brand>
          <Link to="/">
          </Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }}>
          <Nav.Link
                  as={Link}
                  to="/login"
                >
                Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                >
                Sign Up
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/matchesByTeam"
                >
                Matches By Team
                </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header