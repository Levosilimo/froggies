import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import SettingsPage from "../../pages/settings-page/settings-page";
import {AppRoute} from "../../constans";
import "../../scss/main.scss";
import GamePage from "../../pages/game-page/game-page";
import { browserHistory } from '../../browser-history';
import { HistoryRouter } from '../history-route/history-route';
import PageNotFound from "../../pages/page-not-found/page-not-found";
import PrivateRoute from "../private-route/private-route";

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>}/>
        <Route path={AppRoute.Game} element={<PrivateRoute><GamePage/></PrivateRoute>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path={AppRoute.Settings} element={<SettingsPage/>}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </HistoryRouter>
  )
}

export default App;
