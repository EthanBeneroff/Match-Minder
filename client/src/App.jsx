import 'bootstrap/dist/css/bootstrap-grid.css';
import { useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import MatchesByCompetition from './components/MatchesByCompetition';
import MatchesByTeam from './components/MatchesByTeam';
import MyMatches from './components/MyMatches';
import Signup from './components/Signup';
import Home from './components/Home';
import AuthContext from './components/AuthContext';
import Profile from './components/Profile';
import Standings from './components/Standings';





function App() {
  const { isAuthenticated, login, logout } = useContext(AuthContext)
  const [showLoginModal, setShowLoginModal] = useState(false)
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
    <div>
      <Router>
        <Header 
          handleLoginClick={handleLoginClick}
          handleSignUpClick={handleSignUpClick}/>
        <Routes>
          {!isAuthenticated &&(
          <Route path="/login" element={<Login />} />
          )}
          {!isAuthenticated &&( 
          <Route path="/signup" element={<Signup />} />
          )}
          <Route path="/" index element={<Home />} />
          <Route path="/matchesByCompetition" element={<MatchesByCompetition/>} />
          <Route path="/matchesByTeam" element={<MatchesByTeam />} />
          <Route path="/standings" element={<Standings/>} />
          {isAuthenticated &&( <Route path="/myMatches" element={<MyMatches />} />)}
          {isAuthenticated &&( <Route path="/profile" element={<Profile />} />)}
          

        </Routes>
        <Footer />
      </Router>
      {showLoginModal && (
        <Login show={showLoginModal} onClose={handleCloseLoginModal} />
      )}
      {showSignUpModal && (
        <Signup show={showSignUpModal} onClose={handleCloseSignUpModal} />
      )}
    </div>
  )
}

export default App
