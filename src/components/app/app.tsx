import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import {AppRoute} from "../../constants";
import "../../scss/main.scss";
import GamePage from "../../pages/game-page/game-page";
import PageNotFound from "../../pages/page-not-found/page-not-found";
import PrivateRoute from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import { getIsDataLoadingValue } from "../../store/user/selectors";
import LoadingScreen from "../loading-screen/loading-screen";
import { useState } from "react";
import React from "react";
import Layout from "../layout/layout";
import { settingContext } from "../../context";

function App(): JSX.Element {
  const isDataLoading = useAppSelector(getIsDataLoadingValue);
  const [isVisible, setIsVisible] = useState(false);

  if (isDataLoading) {
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
      <Route path="/" element={<Layout />}>
        <Route path={AppRoute.Main} element={<MainPage/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path={AppRoute.Game} element={<PrivateRoute><GamePage/></PrivateRoute>}/>
        <Route path="*" element={<PageNotFound />}/>
      </Route>
    </Routes>
</settingContext.Provider>
  )
}

export default App;
