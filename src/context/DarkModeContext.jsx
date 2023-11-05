import { createContext, useEffect } from "react";

const DarkModeContext = createContext();

import { useLocalStorageState } from "hooks/useLocalStorageState.js";
import PropTypes from "prop-types";

DarkModeProvider.propTypes = {
  children: PropTypes.node,
};

function DarkModeProvider({ children }) {
  const preferredOSMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    preferredOSMode,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html").classList.add("dark-mode");
      document.querySelector("html").classList.remove("light-mode");
    } else {
      document.querySelector("html").classList.add("light-mode");
      document.querySelector("html").classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((value) => !value);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
