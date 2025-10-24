import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "./AuthContext";
import { CartProvider } from './CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Toaster />
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);


