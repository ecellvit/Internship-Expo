import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

ReactDOM.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}>
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
