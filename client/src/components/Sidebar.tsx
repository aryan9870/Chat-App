import { useNavigate } from 'react-router'
import assets, { userDummyData } from '../assets/assets'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


const Sidebar = ({ selectedUser, setSelectedUser }: any) => {

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className={`bg-[#8185B2]/10 h-full rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
        <div style={{padding: "1.25rem"}}>
            <div className="flex justify-between items-center">
                <img src={assets.logo} alt="logo" className="max-w-40"/>
                <div style={{padding: "0.5rem"}} className='relative group'>
                  <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer'/>
                  <div style={{padding: "1.25rem"}} className='absolute top-full right-0 z-20 w-32 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                    <button onClick={() => navigate("/profile")}  className='cursor-pointer text-sm'>Edit Profile</button>
                    <hr style={{margin: "0.5rem 0rem"}} className='border-t border-gray-500'/>
                    <button onClick={logout} className='cursor-pointer text-sm'>Logout</button>
                  </div>
                </div>
            </div>

            {/* Sidebar */}
            <div style={{padding: "0.5rem 1rem 0.5rem 1rem", marginTop: "1.25rem"}} className='bg-[#282142] rounded-full flex items-center gap-2'>
              <img src={assets.search_icon} alt="Search" className='w-3'/>
              <input type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User...' />
            </div>
        </div>

        {/* Contacts */}
        <div className='flex flex-col'>
          {userDummyData.map((user, index) => {
            return <div onClick={() => setSelectedUser(user)} key={index} style={{padding: "0.5rem", paddingLeft: "1rem"}}  className={`relative flex items-center gap-2 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/50 "}`}>
              <img src={user.profilePic} alt="" className='w-8.75 aspect[1/1] rounded-full'/>
              <div className='flex flex-col leading-5'>
                <p>{user.fullName}</p>
                {
                  index < 2 ? <span className='text-green-400 text-xs'>Online</span> : <span className='text-neutral-400 text-xs'>Offline</span>
                }

                {index > 2 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>}

              </div>
            </div>
          })}

        </div>

    </div>
  )
}

export default Sidebar