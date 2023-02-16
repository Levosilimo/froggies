import Header from "../header/header";
import Footer from "../footer/footer";
import {Outlet} from "react-router-dom";
import AudioPlayer from "../audio-player/audio-player";

function Layout(): JSX.Element {
  return(
    <div className="page">
      <Header />
      <AudioPlayer/>
      <Outlet />
      <Footer />
    </div>
  );

}

export default Layout;
