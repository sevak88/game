import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store/configureStore'


import './dist/css/app.css';
import './dist/css/custom.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import official less entry file
import  { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';


const { persistor, store } = configureStore();

//const store = createStore(reducer);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();