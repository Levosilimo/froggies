import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import {AppRoute} from "../../constants";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./main-page.scss";
import SettingsWindow from "../../components/setting-window/settings-window";


function MainPage () {
  const { t } = useTranslation();
  return (
    <div className="page page-main">
      <Header/>
      <SettingsWindow/>
      <main className="main">
        <section className="main-content">
          <div className="game-description">
            <p>
              {t('description')}
            </p>
            <Link to={AppRoute.Game}>{t('startGame')}</Link>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default MainPage;
