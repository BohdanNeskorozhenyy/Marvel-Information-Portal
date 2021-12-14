import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { stopReportingRuntimeErrors } from "react-error-overlay";


import './style/style.scss';


if (process.env.NODE_ENV === "development") {
  stopReportingRuntimeErrors(); 
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

