import { useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { MessageContext } from "../context/MessageContext";

const RightSidebar = ({ selectedUser }: any) => {

  const { logout } = useContext(AuthContext);
  const { messages } = useContext(MessageContext);
  console.log(messages);

  const mediaMessages = messages.filter(
  (message: any) => message.image && message.image.trim() !== ""
  );
  console.log(mediaMessages);
  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div style={{paddingTop: "3rem"}} className="flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.avatar || assets.avatar_icon}
            alt=""
            className="w-20 aspect-square rounded-full"
          />

          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            <p className="w-2 h-2 rounded-full bg-green-500"></p>
            {selectedUser.username}
          </h1>

          <p style={{paddingBottom: "1rem"}} className="px-10 mx-auto">
            {selectedUser.bio}
          </p>
        </div>

        <hr style={{marginBottom: "1rem"}} className="border-[#fffffff50]"/>

        <div style={{padding: "0 1.25rem 0 1.25rem"}} className="px-5 text-xs">
            <p style={{paddingBottom: "0.25rem"}}>Media</p>

            <div className="mt-2 max-h-50 overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 ">
              {mediaMessages.map((message : any, index: any) => (
                <div
                  key={index}
                  onClick={() => window.open(message.image)}
                  className="cursor-pointer rounded"
                >
                  <img
                    src={message.image}
                    alt=""
                    className="h-full rounded-md"
                  />
                </div>
              ))}
            </div>
        </div>

        <button 
          style={{padding: "0.5rem 5rem 0.5rem 5rem"}} 
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    )
  );
};

export default RightSidebar;