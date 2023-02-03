import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import SettingsPage from "../../pages/settings-page/settings-page";
import {AppRoute} from "../../constans";
import "../../scss/main.scss";
import GamePage from "../../pages/game-page/game-page";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>}/>
        <Route path={AppRoute.Game} element={<GamePage/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path={AppRoute.Settings} element={<SettingsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
