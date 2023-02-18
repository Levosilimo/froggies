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
        <section className="user__avatar">
          <h1 className="user__title">User avatar</h1>
        </section>
        <section className="user__score">
          <h1 className="user__title">User score</h1>
        </section>
        <section className="user__access">
          <h1 className="user__title">User score</h1>
        </section>
     </main>
      <Footer/>
    </div>
  )
}

export default UserPage;
