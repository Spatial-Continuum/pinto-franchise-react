import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import './index.css'; 
import { BrowserRouter } from "react-router";
import API_URL from "./globalImport.js" 
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
  <Provider store={store}>
  <BrowserRouter>
    <App />
    </BrowserRouter> 
    </Provider>
);
