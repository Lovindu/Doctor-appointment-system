import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { AdminAuthContextProvider } from './context/AdminAuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <AdminAuthContextProvider>
        <App />
      </AdminAuthContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
