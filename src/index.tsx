import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { checkAuthAction } from "./store/api-action";
import { browserHistory } from "./browser-history";
import { HistoryRouter } from './components/history-route/history-route';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);

