import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'remixicon/fonts/remixicon.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


