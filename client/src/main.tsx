import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/MessageContext";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AuthProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
)
