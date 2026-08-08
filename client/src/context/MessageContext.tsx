import { createContext, useState } from "react";
import api from "../api/axios";


export const MessageContext = createContext<any>(null);

export const MessageProvider = ({ children }: any) => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);


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

  const sendMessage = async (id: string, text: string) => {
    try {
      const response = await api.post(`/messages/send/${id}`, { text });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const value = {
    users,
    selectedUser,
    setSelectedUser,
    messages,
    getUsers,
    getMessages,
    sendMessage
  };

  return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
  );
}