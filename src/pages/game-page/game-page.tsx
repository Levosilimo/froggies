import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SettingsWindow from "../../components/setting-window/settings-window";

function GamePage () {
  return (
    <div className="page page-main">
      <Header/>
      <SettingsWindow/>
      <Footer/>
    </div>
  )
}

export default GamePage;
