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
import { Snackbar, Alert, CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import { useData } from "./components/DataProvider";
import Auth from "./pages/Auth";
function App() {
  // DataProvider is a custom context provider that wraps the entire app (provide all data to all components)
  // useData is the custom hook that allows us to access the data provided by the DataProvider  
    const {toggleDarkMode, setToggleDarkMode} = useData();
  
    const darkTheme = createTheme({
        palette: {
            mode: toggleDarkMode ? 'dark' : 'light',
        },
    });

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
          <Sidebar toggleDarkMode={toggleDarkMode}/>
          <div className="content">
            <Header setToggleDarkMode={setToggleDarkMode}/>
            <div className="main-content-wrapper">
              <div className="main-content">
                  <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="Auth" element={<Auth />} />
                    <Route path="/Home" element={<HomePage/>} />
                    <Route path="/Calendar" element={<Calendar toggleDarkMode={toggleDarkMode} />} />
                    <Route path="/Analytics" element={<Analytics />} />
                    <Route path="/HumanDetection" element={<HumanDetection/>} />
                    <Route
                      path="/Temperature"
                      element={<Modifier variable="temperature"/>}
                    />
                    <Route
                      path="/LightLevel"
                      element={<Modifier variable="lightlevel"/>}
                    />
                  </Routes>
              </div>
            </div>
            <Footer/>
          </div>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
