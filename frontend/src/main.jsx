import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/Global.css';
import { UserProvider } from './context/UserContext'; // ✅ Import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* ✅ Wrap app with user context */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
