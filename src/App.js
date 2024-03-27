import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import CalendarPage from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import HumanDetection from "./pages/HumanDetection";
import Modifier from "./pages/Modifier";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LeftContent from "./components/LeftContent";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="main-content-wrapper">
            <div className="main-content">
              <LeftContent />
              <Routes>
                <Route path="/Home" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/Calendar" element={<CalendarPage />} />
                <Route path="/Analytics" element={<Analytics />} />
                <Route path="/HumanDetection" element={<HumanDetection />} />
                <Route
                  path="/Temperature"
                  element={<Modifier variable="temperature" />}
                />
                <Route
                  path="/LightLevel"
                  element={<Modifier variable="lightlevel"/>}
                />

              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
