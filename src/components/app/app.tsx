import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import SettingsWindow from "../../pages/settings-page/settings-window";
import {AppRoute} from "../../constans";
import "../../scss/main.scss";
import GamePage from "../../pages/game-page/game-page";
import { settingContext } from "../../context";
import { useState } from "react";

function App(): JSX.Element {

  const [isVisible, setIsVisible] = useState(false);

  return (
    <settingContext.Provider value = {{
      isVisible,
      setIsVisible,
    }}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage/>}/>
          <Route path={AppRoute.Game} element={<GamePage/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route path={AppRoute.Settings} element={<SettingsWindow/>}/>
        </Routes>
      </BrowserRouter>
      </settingContext.Provider>
  )
}

export default App;
