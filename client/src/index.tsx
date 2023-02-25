import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
