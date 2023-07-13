import React from 'react'
import {Nav, Navbar, Container} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import Login from './Login'
import AuthContext from './AuthContext'
import Signup from './Signup'

function Header() {

const {isAuthenticated, login, logout} = useContext(AuthContext)
const [showLoginModal, setShowLoginModal] = useState(false);
const [showSignUpModal, setShowSignUpModal] = useState(false)

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  return (
    <>
    <Navbar expand="lg" >
      <Container>
        <Navbar.Brand>
          <Link to="/">
          </Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }}>
            {!isAuthenticated &&(<><Nav.Link
                  as={Link}
                  
                  onClick={handleLoginClick}
                >
                Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  onClick={handleSignUpClick}
                >
                Sign Up
                </Nav.Link></>)}
          
                <Nav.Link
                  as={Link}
                  to="/matchesByTeam"
                >
                Matches By Team
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/matchesByCompetition"
                >
                Matches By Competition
                </Nav.Link>
                {isAuthenticated && (<><Nav.Link
                  as={Link}
                  to="/myMatches"
                >
                myMatches
                </Nav.Link><Nav.Link
                    onClick={logout}
                  as={Link}
                  to="/"
                >
                Log Out
                </Nav.Link></>)}
                
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showLoginModal && <Login show={showLoginModal} onClose={handleCloseLoginModal} />}
    {showSignUpModal && <Signup show={showSignUpModal} onClose={handleCloseSignUpModal} />}
    </>
  )
}

export default Header