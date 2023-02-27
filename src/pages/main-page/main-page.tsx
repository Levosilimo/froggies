import {AppRoute} from "../../constants";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./main-page.scss";


function MainPage () {
  const { t } = useTranslation();
  return (
    <div className="page-main">
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
    </div>
  )
}

export default MainPage;
