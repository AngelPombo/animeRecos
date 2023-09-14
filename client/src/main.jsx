import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'; 

import './index.css'
import { SessionProvider } from './context/sessionContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionProvider >
      <BrowserRouter> 
        <App />
      </BrowserRouter> 
    </SessionProvider>

  </React.StrictMode>
)
