import './header.scss';
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants";
import { useContext } from 'react';
import { settingContext } from '../../context';

function Header(): JSX.Element {

  const {isVisible, setIsVisible} = useContext(settingContext)

  return  (
      <header className='header'>
        <h2 className='header-title'>Froggy css game</h2>
        <ul className='header-menu'>
          <li><Link to={AppRoute.Main}>Main page</Link></li>
          <li><Link to={AppRoute.Login}>Login</Link></li>
          <li><Link to={AppRoute.Game}>Game</Link></li>
          <li onClick={() => setIsVisible(true)}><img className="gear" src="../../../images/gear.png" alt="settings"/></li>
        </ul>
      </header>
  )

}

export default Header;
