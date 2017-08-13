import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const app = <App />;
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
