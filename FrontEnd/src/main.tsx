import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { UserProvider } from './context/UserContext.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
)
