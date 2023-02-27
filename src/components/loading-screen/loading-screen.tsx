import React from 'react';
import './loading-screen.scss';
import {useTranslation} from "react-i18next";

function LoadingScreen(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="loader-block">
      <span className="loader"></span>
      <p className='loader-message'>{t("loading")}</p>
    </div>
  );
}

export default LoadingScreen;
