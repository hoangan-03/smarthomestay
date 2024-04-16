import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import HumanDetection from "./pages/HumanDetection";
import Modifier from "./pages/Modifier";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [hex, setHex] = useState("#FFFFFF");
  const [fan, setFan] = useState(0);
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="main-content-wrapper">
            <div className="main-content">
              <Routes>
                <Route exact path="/" element={<HomePage hex={hex} fan={fan} />} />
                <Route path="/Home" element={<HomePage hex={hex} fan={fan} />} />
                <Route path="/Calendar" element={<Calendar />} />
                <Route path="/Analytics" element={<Analytics />} />
                <Route path="/HumanDetection" element={<HumanDetection />} />
                <Route
                  path="/Temperature"
                  element={<Modifier variable="temperature" hex={hex} setHex={setHex} fan={fan} setFan={setFan} />}
                />
                <Route
                  path="/LightLevel"
                  element={<Modifier variable="lightlevel" hex={hex} setHex={setHex} />}
                />

              </Routes>


            </div>

          </div>
          <Footer />

        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
