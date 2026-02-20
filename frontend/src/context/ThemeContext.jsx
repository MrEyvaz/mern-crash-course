import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light")

    useEffect(() => {
        localStorage.setItem("theme", dark ? "dark" : "light")
    }, [dark])

    const themeStyles = {
        background: dark ? "bg-primaryGray" : "bg-white",
        createCard: dark ? "bg-primaryGray text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : " shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white text-black",
        input: dark ? "bg-primaryGray  border border-gray-600 text-white"
            : "bg-gray-100 border-gray-300 text-black",
        card: dark ? "bg-primaryGray text-white" : "bg-white text-black",
    };

    return (
        <ThemeContext.Provider value={{ dark, setDark, themeStyles }}>
            {children}
        </ThemeContext.Provider>
    )
}