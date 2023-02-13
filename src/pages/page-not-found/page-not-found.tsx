import { Link } from 'react-router-dom';
import './page-not-found.scss';
import Header from '../../components/header/header';
import Footer from "../../components/footer/footer";

function PageNotFound(): JSX.Element {
  return (
    <div className="page page-main">
      <Header/>
      <main className="page-not-found">
            <h2>404</h2>
            <p>Page not found</p>
            <Link className="link" to="/">Back to home page</Link>
      </main>
      <Footer/>
    </div>

  );
}

export default PageNotFound;
