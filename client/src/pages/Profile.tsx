import { useNavigate } from "react-router";
import assets from "../assets/assets"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Profile = () => {

  const { user, getProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        const formData = new FormData();

        formData.append("username", username);
        formData.append("bio", bio);

        if (avatar) {
            formData.append("avatar", avatar);
        }

        const { data } = await api.put("/users/profile", formData);

        if(data.success) {
          getProfile();
          toast.success(data.message);
          navigate("/");
        }
    } catch (error) {
        console.log(error);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} style={{padding: "2.5rem"}} className="flex flex-col gap-5 flex-1">
          <h3 className="text-lg">Profile details</h3>

          <label
            htmlFor="avatar"
            className='flex items-center gap-3 cursor-pointer'
          >
            <input
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              type="file"
              id='avatar'
              accept='.png, .jpg, .jpeg'
              hidden
            />
            <img src={avatar ? URL.createObjectURL(avatar) : user.avatar} alt="" className={`w-12 h-12 rounded-full`}/>
            upload profile image
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            required
            placeholder="Your name"
            style={{padding: "0.5rem"}}
            className='border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            style={{padding: "0.5rem"}}
            className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>

          <button style={{padding: "0.5rem"}} type="submit" className="bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-full text-lg cursor-pointer">
            {loading ? "Loading..." : "Save"}
          </button>
        </form>

        <img style={{margin: "0 2.5rem 0 2.5rem"}} className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10" src={assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default Profile