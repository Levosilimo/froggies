import {Route, Routes} from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import {AppRoute, AuthorizationStatus} from "../../constants";
import "../../scss/main.scss";
import GamePage from "../../pages/game-page/game-page";
import UserPage from "../../pages/user-page/user-page";
import {browserHistory} from '../../browser-history';
import {HistoryRouter} from '../history-route/history-route';
import PageNotFound from "../../pages/page-not-found/page-not-found";
import PrivateRoute from "../private-route/private-route";
import AdminDashboardPage from "../../pages/admin-dashboard-page/admin-dashboard-page";
import PrivateRouteAdmin from "../private-route/private-route-admin";
import {getAuthorizationStatus} from "../../store/user/selectors";
import { useAppSelector } from "../../hooks";
import { getIsDataLoadedValue } from "../../store/user/selectors";
import LoadingScreen from "../loading-screen/loading-screen";
import { settingContext } from "../../context";
import { useState } from "react";

function App(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const isDataLoaded = useAppSelector(getIsDataLoadedValue);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <h1>Loading...</h1>;
  }
  
  return (
    <HistoryRouter history={browserHistory}>
      <settingContext.Provider value = {{
      isVisible,
      setIsVisible,
    }}>
        <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route path={AppRoute.User} element={<UserPage/>}/>
          <Route path={AppRoute.Game} element={<PrivateRoute><GamePage/></PrivateRoute>}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </settingContext.Provider>
    </HistoryRouter>
  )
}

export default App;
