import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import { useState, useEffect } from "react";

import './App.css'


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
  });

  return (
    <div className="App">
    <BrowserRouter>
      <Header dimensions={dimensions} auth={false}/>
      <Routes>
        <Route path="/home" element={<Home dimensions={dimensions} />} />
        <Route path="*" element={<Home dimensions={dimensions} />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
