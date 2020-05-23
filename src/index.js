import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import serviceWorker from './registerServiceWorker';
import "antd/dist/antd.less";
import './assets/css/style.css';


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker()
