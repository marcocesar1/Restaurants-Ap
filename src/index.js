import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RestaurantApp from './RestaurantApp';
import reportWebVitals from './reportWebVitals';

import './i18n';
ReactDOM.render(
    <RestaurantApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
