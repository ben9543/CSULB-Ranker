import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from 'react-toastify';
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Post from "./pages/Post";
import Vote from "./pages/Vote";
import About from "./pages/About";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
function App() {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  onAuthStateChanged(auth, async(user) => {
      if (user){
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
  });
  return (
    <div className="App">
      <Nav loggedIn={loggedIn}/>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn}/>} />
          <Route path="/signup" element={<SignUp loggedIn={loggedIn}/>} />
          <Route path="/login" element={<LogIn loggedIn={loggedIn} />} />
          <Route path="/posts" element={<Post loggedIn={loggedIn} />} />
          <Route path="/votes" element={<Vote loggedIn={loggedIn} />} />
          <Route path="/about" element={<About loggedIn={loggedIn} />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
