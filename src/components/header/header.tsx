import './header.scss';
import {Link} from "react-router-dom";
import {AppRoute} from "../../constans";

function Header(): JSX.Element {
  return  (
      <header className='header'>
        <h2 className='header-title'>Froggy css game</h2>
        <ul className='header-menu'>
          <li><Link to={AppRoute.Main}>Main page</Link></li>
          <li><Link to={AppRoute.Login}>Login</Link></li>
          <li><Link to={AppRoute.Game}>Game</Link></li>
          <li><Link to={AppRoute.Settings}>Settings</Link></li>
        </ul>
      </header>
  )

}

export default Header;
