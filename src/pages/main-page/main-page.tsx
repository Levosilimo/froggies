import {AppRoute} from "../../constants";
import {Link} from "react-router-dom";
import "./main-page.scss";

function MainPage () {
  return (
    <div className="page-main">
      <main className="main">
        <section className="main-content">
          <div className="game-description">
            <p>
              Help Froggy and friends by writing CSS code! In this game, you must bring the frogs home to their lilypads
              by mastering CSS flexbox, a powerful new module that makes layout a breeze. With it you can control
              alignment, spacing, and wrapping of elements on the webpage using only one or two lines of code.
            </p>
            <Link to={AppRoute.Game}>Start game</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MainPage;
