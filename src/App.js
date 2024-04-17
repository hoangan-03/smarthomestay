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
import LeftContent from "./components/LeftContent";
import Footer from "./components/Footer";
import { Snackbar, Alert } from "@mui/material";
import { DataProvider } from "./components/DataProvider";
function App() {
  const [hex, setHex] = useState("#d0021b");
  const [fan, setFan] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessage, setAlertMessage] = useState("ERror message");
  const [autoMode, setAutoMode] = useState(true);
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="main-content-wrapper">
            <div className="main-content">
              {/* <LeftContent /> */}
              <Routes>
                  <Route exact path="/" element={<HomePage hex={hex} fan={fan}/>} />
                  <Route path="/Home" element={<HomePage hex={hex} fan={fan}/>} />
                  <Route path="/Calendar" element={<Calendar />} />
                  <Route path="/Analytics" element={<Analytics />} />
                  <Route path="/HumanDetection" element={<HumanDetection setOpenAlert={setOpenAlert} setAlertSeverity={setAlertSeverity} setAlertMessage={setAlertMessage} />} />
                  <Route
                    path="/Temperature"
                    element={<Modifier variable="temperature" hex={hex} setHex={setHex} fan={fan} setFan={setFan}/>}
                  />
                  <Route
                    path="/LightLevel"
                    element={<Modifier variable="lightlevel" hex={hex} setHex={setHex}/>}
                  />

                </Routes>
              
              
              
            </div>
            
          </div>
          <Footer/>
          
        </div>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleAlertClose}

        > 
          <Alert onClose={handleAlertClose} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
