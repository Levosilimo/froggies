import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SettingsWindow from "../settings-page/settings-window";

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
