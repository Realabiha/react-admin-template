import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './index.less';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);