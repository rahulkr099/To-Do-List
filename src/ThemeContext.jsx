import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{

    const [isDarkMode,setIsDarkMode]= useState(false);

    const toggleTheme = ()=>{
        
        setIsDarkMode((prevState)=>!prevState);
    };

    const theme = isDarkMode?'Dark':'Light';

    useEffect(()=>{
        toggleTheme();
    console.log('theme useEffect is run')
    },[setIsDarkMode])

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>{children}</ThemeContext.Provider>
    )
}