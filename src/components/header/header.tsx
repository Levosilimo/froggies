import './header.scss';
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../../constants";
import {useContext} from 'react';
import {settingContext} from '../../contexts/settingContext';
import {useAppSelector} from "../../hooks";
import {store} from "../../store";
import {getAuthorizationStatus, getIsAdmin, getUsername} from "../../store/user/selectors";
import {logOutAction} from "../../store/user/user-data";
import {useTranslation} from "react-i18next";
import AudioPlayer from "../audio-player/audio-player";


function Header(): JSX.Element {

  const {isVisible, setIsVisible} = useContext(settingContext)

  const {t} = useTranslation();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAdmin = useAppSelector(getIsAdmin);

  const userName = useAppSelector(getUsername) ?? '';

  const urlForUserImage = `https://rsclone-backend.adaptable.app/avatar/${userName}`;
  const logOut = () => store.dispatch(logOutAction());

  return (
    <header className='header'>
      <h2 className='header-title'>Froggy css game</h2>
      <ul className='header-menu'>
        <li><Link to={AppRoute.Main}>{t("mainPage")}</Link></li>
        <li><Link to={AppRoute.Game}>{t("gamePage")}</Link></li>
        {(isAdmin) ? (<li><Link to={AppRoute.Dashboard}>{t("usersPage")}</Link></li>) : ''}
        <li onClick={() => setIsVisible(true)}><img className="gear" src="../../../images/gear.png" alt="settings"/></li>
        <li><AudioPlayer/></li>
      </ul>
      <div className="header-user">
        {authorizationStatus !== AuthorizationStatus.Auth
          ? (<Link className="header-login" to={AppRoute.Login}>{t("login")}</Link>)
          : (<div className="header-user-data">
            <div className="user">
              <div className="header-avatar">
              <Link to={AppRoute.User}><img src={urlForUserImage} width="40" height="40" alt="User avatar"/></Link>
              </div>
              <span className="header-username"><Link to={AppRoute.User}>{userName}</Link></span>
            </div>
            <button className="header-signout" onClick={logOut}>{t("logout")}</button>
          </div>)}
      </div>
    </header>
  )
}

export default Header;
