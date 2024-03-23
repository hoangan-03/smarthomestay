import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import HumanDetection from "./pages/HumanDetection";
import LightLevel from "./pages/LightLevel";
import Temperature from "./pages/Temperature";
import Sidebar from "./components/Sidebar"
import Header from "./components/Header";
import LeftContent from "./components/LeftContent";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="content">
          <Header/>
          <div className="main-content">
            <LeftContent />
            <Routes>
              <Route path="/Home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/HumanDetection" element={<HumanDetection />} />
              <Route path="/LightLevel" element={<LightLevel />} />
              <Route path="/Temperature" element={<Temperature />} />
            </Routes>
          </div>
          
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
