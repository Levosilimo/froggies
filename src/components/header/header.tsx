import './header.scss';
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../../constants";
import { useContext } from 'react';
import { settingContext } from '../../context';
import {useAppSelector} from "../../hooks";
import {getUserData} from "../../services/local-storage";
import {store} from "../../store";
import {getAuthorizationStatus, getIsAdmin} from "../../store/user/selectors";
import {logOutAction} from "../../store/user/user-data";


function Header(): JSX.Element {

  const {isVisible, setIsVisible} = useContext(settingContext)

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAdmin = useAppSelector(getIsAdmin);

  const userName = getUserData()?.username || '';

  const urlForUserImage = `https://rsclone-backend.adaptable.app/avatar/${userName}`;

  const logOut = () => store.dispatch(logOutAction());

  return  (
      <header className='header'>
        <h2 className='header-title'>Froggy css game</h2>
        <ul className='header-menu'>
          <li><Link to={AppRoute.Main}>Main page</Link></li>
          <li><Link to={AppRoute.Game}>Game</Link></li>
          <li onClick={() => setIsVisible(true)}><img className="gear" src="../../../images/gear.png" alt="settings"/></li>
          {(isAdmin)?(<li><Link to={AppRoute.Dashboard}>Admin Dashboard</Link></li>):''}
        </ul>
        <div className="header-user">
          {authorizationStatus !== AuthorizationStatus.Auth
            ? ( <Link className="header-login" to={AppRoute.Login}>Login</Link>)
            : (<div className="header-user-data">
                <div className="header-avatar">
                  <Link to={AppRoute.User}><img src={urlForUserImage} width="30" height="30" alt="User avatar"/></Link>
                  <Link to={AppRoute.User}><img src={urlForUserImage} width="30" height="30" alt="User avatar"/></Link>
                </div>
                <span className="header-username"><Link to={AppRoute.User}>{userName}</Link></span>
                <button className="header-singout" onClick={logOut}>Sign out</button>
                <span className="header-username"><Link to={AppRoute.User}>{userName}</Link></span>
                <button className="header-signout" onClick={logOut}>Sign out</button>
              </div>)
          }
        </div>
      </header>
  )

}

export default Header;
