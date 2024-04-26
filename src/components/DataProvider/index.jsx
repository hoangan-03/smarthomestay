import React, { createContext, useContext, useState, useEffect } from 'react';
import ConsecutiveSnackbars from '../ConsecutiveSnackbars';
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
    const [hex, setHex] = useState("#ffffff");
    const [fan, setFan] = useState('0');
    const [autoMode, setAutoMode] = useState(true);
    const [snackPack, setSnackPack] = React.useState([]);
    const [messageInfo, setMessageInfo] = React.useState(undefined);
    const [toggleDarkMode, setToggleDarkMode] = useState(false);
    useEffect(() => {
        if (toggleDarkMode) {
        document.body.classList.add('dark');
        } else {
        document.body.classList.remove('dark');
        }
    }, [toggleDarkMode]); 

    const handleClick = (message, severity) => () => {
      setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
    };


    return (
        <DataContext.Provider value={{hex, setHex, fan, setFan, autoMode, setAutoMode, toggleDarkMode, setToggleDarkMode, handleClick}}>
            {children}
            <ConsecutiveSnackbars snackPack={snackPack} setSnackPack={setSnackPack} messageInfo={messageInfo} setMessageInfo={setMessageInfo} handleClick={handleClick}/>
        </DataContext.Provider>
    );
};
