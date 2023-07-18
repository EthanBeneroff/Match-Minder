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
  // console.log(login)
  function testfunction(testparam){
    console.log("this is a test" + testparam)
  }

  return (
    <div>
      <Router>
        <Header/>
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
    </div>
  )
}

export default App
