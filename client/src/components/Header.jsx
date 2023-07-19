import React from 'react'
import {Nav, Navbar, Container} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import Login from './Login'
import AuthContext from './AuthContext'
import Signup from './Signup'

function Header({handleLoginClick, handleSignUpClick }) {

const {isAuthenticated, login, logout} = useContext(AuthContext)
// const [showLoginModal, setShowLoginModal] = useState(false);
// const [showSignUpModal, setShowSignUpModal] = useState(false)

//   const handleLoginClick = () => {
//     setShowLoginModal(true);
//   };

//   const handleCloseLoginModal = () => {
//     setShowLoginModal(false);
//   };

//   const handleSignUpClick = () => {
//     setShowSignUpModal(true);
//   };

//   const handleCloseSignUpModal = () => {
//     setShowSignUpModal(false);
//   };

  return (
    <div className="horizontal-bar">
    <Navbar expand="lg" >
      <Container>
        <Navbar.Brand>
          <Link to="/">
          </Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }}>
          {isAuthenticated && (<><Nav.Link
                  as={Link}
                  to="/"
                >
                Home
                </Nav.Link></>)}
            {!isAuthenticated &&(<><Nav.Link
                  as={Link}
                  to="#"
                  onClick={handleLoginClick}
                >
                Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="#"
                  onClick={handleSignUpClick}
                >
                Sign Up
                </Nav.Link></>)}
          
                <Nav.Link
                  as={Link}
                  to="/matchesByTeam"
                >
                Teams
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/matchesByCompetition"
                >
                Competitions
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/standings"
                >
                Standings
                </Nav.Link>
                {isAuthenticated && (<><Nav.Link
                  as={Link}
                  to="/myMatches"
                >
                My Matches
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                >
                My Profile
                </Nav.Link>
                <Nav.Link
                    onClick={logout}
                  as={Link}
                  to="/login"
                >
                Log Out
                </Nav.Link>
                
                </>)}
                
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* {showLoginModal && <Login show={showLoginModal} onClose={handleCloseLoginModal} />}
    {showSignUpModal && <Signup show={showSignUpModal} onClose={handleCloseSignUpModal} />} */}
    </div>
  )
}

export default Header