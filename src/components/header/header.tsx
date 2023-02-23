import './header.scss';
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../../constants";
import { useContext } from 'react';
import { settingContext } from '../../context';
import {useAppSelector} from "../../hooks";
import {store} from "../../store";
import {getAuthorizationStatus, getUsername} from "../../store/user/selectors";
import {logOutAction} from "../../store/user/user-data";
import {useTranslation} from "react-i18next";


function Header(): JSX.Element {

  const {isVisible, setIsVisible} = useContext(settingContext)

  const { t } = useTranslation();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const userName = useAppSelector(getUsername) ?? '';

  const urlForUserImage = `https://rsclone-backend.adaptable.app/avatar/${userName}`;

  const logOut = () => store.dispatch(logOutAction());

  return  (
      <header className='header'>
        <h2 className='header-title'>Froggy css game</h2>
        <ul className='header-menu'>
          <li><Link to={AppRoute.Main}>{t("mainPage")}</Link></li>
          <li><Link to={AppRoute.Game}>{t("gamePage")}</Link></li>
          <li onClick={() => setIsVisible(true)}><img className="gear" src="../../../images/gear.png" alt="settings"/></li>
        </ul>
        <div className="header-user">
          {authorizationStatus !== AuthorizationStatus.Auth
            ? ( <Link className="header-login" to={AppRoute.Login}>{t("login")}</Link>)
            : (<div className="header-user-data">
              <div className="user">
                <div className="header-avatar">
                  <img src={urlForUserImage} width="30" height="30" alt="User avatar"/>
                </div>
                <span className="header-username">{userName}</span>
              </div>
              <button className="header-signout" onClick={logOut}>{t("logout")}</button>
              </div>)
          }
        </div>
      </header>
  )

}

export default Header;
