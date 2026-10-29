import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}