import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router";
import API_URL from "./globalImport.js"
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
import { ThemeProvider } from "@material-tailwind/react";
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
