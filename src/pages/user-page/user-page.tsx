import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SettingsWindow from "../../components/setting-window/settings-window";
import "./user-page.scss";

function UserPage(): JSX.Element {
  return (
    <div className="UserPage">
      <Header/>
      <SettingsWindow/>
      <main className="user">
        <h1 className="user__title">Profile</h1>
        <section className="info user__info">
          <h2 className="info__title">Info</h2>
          <div className="avatar info__avatar">
            <p className="avatar__title">User avatar:</p>
            <img src="VAR" alt="user avatar" className="avatar__img" />
          </div>
          <p className="info__name">User name: VAR</p>
          <p className="info__access">User access level: VAR</p>
          <p className="info__rank">User rank: VAR</p>
        </section>
        <section className="score user__score">
          <h2 className="score__title">Score</h2>
          <div></div>
        </section>
     </main>
      <Footer/>
    </div>
  )
}

export default UserPage;
