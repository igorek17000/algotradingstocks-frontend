import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import data from './redux/store';
// import persistor from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={data.store}>
      <PersistGate persistor={data.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
