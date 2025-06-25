import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// ✅ Import Bootstrap CSS and JS here:
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Enables navbar toggle

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
