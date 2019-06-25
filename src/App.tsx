import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Modal from 'react-modal';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

Modal.setAppElement('#app');

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

