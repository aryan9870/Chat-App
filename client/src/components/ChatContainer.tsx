import { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets"
import dayjs from "dayjs";

const ChatContainer = ({setSelectedUser, selectedUser }: any) => {

  const scrollEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(scrollEnd.current) {
      scrollEnd.current.scrollIntoView({behavior: "smooth"});
    }
  }, [])
  

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* ......header....... */}
      <div style={{padding: "0.75rem 0rem 0.75rem 0rem", margin: "0 1rem 0 1rem"}} className="flex items-center gap-3 border-b border-stone-500">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full"/>
        <p className="flex-1 text-lg text-white flex items-center gap-2">Martin Johnson <span className="w-2 h-2 rounded-full bg-green-500"></span></p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className="md:hidden max-w-7"/>
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5"/>
      </div>

    {/* ------- chat area ------- */}
    <div style={{padding: "0.75rem", paddingBottom: "1.5rem"}}  className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll">
      {messagesDummyData.map((msg, index) => (
        <div key={index} className={`flex items-end gap-2 justify-end ${
            msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}>
          {msg.image ? (
            <img style={{marginBottom: "2rem"}} src={msg.image} alt="" className="max-w-50 border border-gray-700 rounded-lg overflow-hidden"/>
          ) : (
            <p style={{marginBottom: "2rem", padding: "0.5rem"}} className={` max-w-60 md:text-sm font-light rounded-lg break-all text-white bg-blue-400 ${
                msg.senderId === "680f50e4f10f3cd28382ecf9" ? "rounded-br-none" : "rounded-bl-none"}`}>
              {msg.text}
            </p>
          )}

          <div className="flex flex-col items-center gap-2">
            <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className="w-7 rounded-full"/>
            <p className="text-gray-500 text-xs">{dayjs(msg.createdAt).format("hh:mm A")}</p>
          </div>
        </div>
      ))}
      <div ref={scrollEnd}></div>
    </div>

    {/* -------- Bottom Area -------- */}
    <div style={{padding: "0.75rem"}} className="absolute bottom-0 left-0 right-0 flex items-center gap-3">

      <div style={{padding: "0 0.75rem 0 0.75rem"}} className="flex-1 flex items-center bg-[#2b2b2b] rounded-lg">

        <input
          type="text"
          placeholder="Send a message"
          style={{padding: "0.75rem"}}
          className="flex-1 bg-transparent text-sm border-none outline-none text-white placeholder-gray-400"
        />

        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          hidden
        />

        <label htmlFor="image">
          <img
            src={assets.gallery_icon}
            alt=""
            className="w-5 mr-2 cursor-pointer"
          />
        </label>
      </div>

      <img
        src={assets.send_button}
        alt=""
        className="w-7 cursor-pointer"
      />
    </div>

    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-center h-full text-gray-300">
      <img
        src={assets.logo_icon}
        alt=""
        className="w-16"
      />

      <p className="text-xl font-medium">
        Chat anytime, anywhere
      </p>
    </div>
  )
}

export default ChatContainer