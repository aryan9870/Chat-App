import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "./AuthContext";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: any) => {
    const { user } = useContext(AuthContext);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!user?._id) return;

        const newSocket = io("http://localhost:5000", {
            query: {
                userId: user._id,
            },
            withCredentials: true,
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user?._id]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};