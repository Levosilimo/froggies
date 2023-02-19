import {Route, Routes} from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import SettingsPage from "../../pages/settings-page/settings-page";
import {AppRoute, AuthorizationStatus} from "../../constans";
import "../../scss/main.scss";
import GamePage from "../../pages/game-page/game-page";
import PageNotFound from "../../pages/page-not-found/page-not-found";
import PrivateRoute from "../private-route/private-route";
import AdminDashboardPage from "../../pages/admin-dashboard-page/admin-dashboard-page";
import PrivateRouteAdmin from "../private-route/private-route-admin";
import { useAppSelector } from "../../hooks";
import { getIsDataLoadedValue, getAuthorizationStatus } from "../../store/user/selectors";
import LoadingScreen from "../loading-screen/loading-screen";

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoadedValue);

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path={AppRoute.Dashboard} element={<PrivateRouteAdmin><AdminDashboardPage/></PrivateRouteAdmin>}/>
        <Route path={AppRoute.Game} element={<PrivateRoute><GamePage/></PrivateRoute>}/>
        <Route path={AppRoute.Settings} element={<SettingsPage/>}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
  )
}

export default App;
