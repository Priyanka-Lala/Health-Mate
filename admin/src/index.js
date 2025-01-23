import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider from './Context/Admincontext';
import DoctorContextProvider from './Context/Doctorcontext';
import AppContextProvider from './Context/Appcontext';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
    <App />
    </AppContextProvider>
    </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
