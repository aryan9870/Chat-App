import Sidebar from "../components/Sidebar"
import ChatContainer from "../components/ChatContainer"
import RightSidebar from "../components/RightSidebar"
import { useState } from "react"

const Home = () => {

  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div style={{ padding: '5% 15% 5% 15%' }} className="h-screen w-full text-white">
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr]" : "md:grid-cols-[1fr_2fr]"}`}>
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <RightSidebar selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default Home