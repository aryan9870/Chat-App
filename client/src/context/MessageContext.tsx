import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useSocket } from "./SocketContext";


export const MessageContext = createContext<any>(null);

export const MessageProvider = ({ children }: any) => {

  const socket = useSocket();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);


  const getUsers = async () => {
    try {
      const response = await api.get("/messages/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      }
    };

  const getMessages = async (id: string) => {
    try {
      const response = await api.get(`/messages/${id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (id: string, content: string) => {
    try {
      const response = await api.post(`/messages/send/${id}`, { content });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (users: string[]) => {
        setOnlineUsers(users);
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
        socket.off("getOnlineUsers", handleOnlineUsers);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: any) => {
        setMessages((prev: any[]) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
        socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const value = {
    users,
    selectedUser,
    setSelectedUser,
    messages,
    getUsers,
    getMessages,
    sendMessage,
    onlineUsers
  };

  return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
  );
}