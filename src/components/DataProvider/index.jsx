import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useAutoMode = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [hex, setHex] = useState("#d0021b");
    const [fan, setFan] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [alertMessage, setAlertMessage] = useState("Error message");
    const [autoMode, setAutoMode] = useState(true);

    return (
        <DataContext.Provider value={{hex, setHex, fan, setFan, openAlert, setOpenAlert, alertSeverity, setAlertSeverity, alertMessage, setAlertMessage, autoMode, setAutoMode }}>
        {children}
        </DataContext.Provider>
    );
};
