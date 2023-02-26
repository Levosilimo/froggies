import React, {SetStateAction} from "react";

interface ThemeContextState {
  theme: string,
  setTheme?: React.Dispatch<SetStateAction<string>>,
}

export const initialThemeState: ThemeContextState = {
  theme: "green",
};

const ThemeContext = React.createContext(initialThemeState);
export default ThemeContext;
