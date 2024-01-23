import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import User from "./pages/User";
import { useState, useEffect } from "react";
import { AuthProvider, RequireAuth } from "./Auth";

import './App.css'
import SignUp from "./pages/Signup";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
    
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header dimensions={dimensions}/>
          <Routes>
            <Route path="/home" element={<Home dimensions={dimensions} />} />
            <Route path="/login" element={<Login dimensions={dimensions} />} />
            <Route path="/signup" element={<SignUp dimensions={dimensions} />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<User />} />
              <Route path="/search" element={<Search dimensions={dimensions} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
