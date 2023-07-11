import { useState } from 'react'
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

function App() {
  

  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/matchesByCompetition" element={<MatchesByCompetition/>} />
          <Route path="/matchesByTeam" element={<MatchesByTeam />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myMatches" element={<MyMatches />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
