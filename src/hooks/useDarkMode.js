import { DarkModeContext } from "context/DarkModeContext.jsx";
import { useContext } from "react";

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkModeContext used outside of DarkModeProvider.");

  return context;
}

export default useDarkMode;
