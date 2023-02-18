import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import {AppRoute} from "../../constants";
import "../../scss/main.scss";
import GamePage from "../../pages/game-page/game-page";
import PageNotFound from "../../pages/page-not-found/page-not-found";
import PrivateRoute from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import { getIsDataLoadedValue } from "../../store/user/selectors";
import LoadingScreen from "../loading-screen/loading-screen";
import { settingContext } from "../../context";
import { useState } from "react";
import UserPage from "../../pages/user-page/user-pge";

function App(): JSX.Element {

  const [isVisible, setIsVisible] = useState(false);

  const isDataLoaded = useAppSelector(getIsDataLoadedValue);

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
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
  )
}

export default App;
