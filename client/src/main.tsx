import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/MessageContext";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthProvider>
            <SocketProvider>
                <MessageProvider>
                    <App />
                </MessageProvider>
            </SocketProvider>
        </AuthProvider>
    </BrowserRouter>
);