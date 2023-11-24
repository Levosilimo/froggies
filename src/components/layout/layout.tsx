import Header from "../header/header";
import Footer from "../footer/footer";
import {Outlet} from "react-router-dom";
import SettingsWindow from "../setting-window/settings-window";

function Layout(): JSX.Element {
  return(
    <div className="page-wrapper">
      <Header />
      <SettingsWindow/>
      <Outlet />
      <Footer />
    </div>
  );

}

export default Layout;
