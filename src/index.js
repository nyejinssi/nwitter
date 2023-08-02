import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

