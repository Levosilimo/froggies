import Header from "../header/header";
import Footer from "../footer/footer";
import {Outlet} from "react-router-dom";

function Layout(): JSX.Element {
  return(
    <div className="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );

}

export default Layout;
