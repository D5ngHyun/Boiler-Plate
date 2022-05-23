import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';




function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegistserPage = Auth(RegisterPage, false);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
          <li>
            <Link to="/register">RegisterPage</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AuthLandingPage />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/register" element={<AuthRegistserPage />} />
      </Routes>
    </>
  )
}



export default App
