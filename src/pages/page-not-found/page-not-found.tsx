import { Link } from 'react-router-dom';
import './page-not-found.scss';

function PageNotFound(): JSX.Element {
  return (
      <div className="page-main">
        <main className="page-not-found">
              <h2>404</h2>
              <p>Page not found</p>
              <Link className="link" to="/">Back to home page</Link>
        </main>
      </div>
  );
}

export default PageNotFound;
