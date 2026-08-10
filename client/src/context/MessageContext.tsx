import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useSocket } from "./SocketContext";


export const MessageContext = createContext<any>(null);

export const MessageProvider = ({ children }: any) => {

  const socket = useSocket();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


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
      getUsers();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (id: string, content: string, image: File | null) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("content", content);

      if (image) {
          formData.append("image", image);
      }

      await api.post(`/messages/send/${id}`, formData);

    } catch (error) {
      console.error("Error sending message:", error);
    } finally{
      setLoading(false);
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

    if (!socket || !selectedUser) return;

    const handleNewMessage = (message: any) => {

      getUsers()

      if (String(message.sender) === String(selectedUser._id) || String(message.receiver) === String(selectedUser._id)) {
      setMessages((prev: any[]) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
        socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser]);

  const value = {
    users,
    selectedUser,
    setSelectedUser,
    messages,
    getUsers,
    getMessages,
    sendMessage,
    onlineUsers,
    loading
  };

  return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
  );
}