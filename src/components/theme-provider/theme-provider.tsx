import React, { useState, useEffect } from "react";
import ThemeContext, { initialThemeState } from "../../contexts/themeContext";
import {useAppSelector} from "../../hooks";
import {getTheme} from "../../store/user/selectors";

type ThemeProviderProps = {
  children: JSX.Element;
}
function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<string>(initialThemeState.theme);
  const themeStored = useAppSelector(getTheme);

  useEffect(() => {
    setTheme(themeStored);
  }, [themeStored]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`}>{props.children}</div>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
