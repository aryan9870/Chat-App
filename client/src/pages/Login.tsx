import assets from "../assets/assets"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {

  const { setUser } = useContext(AuthContext);

  const [state, setState] = useState("Sign up");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
      e.preventDefault();
      if(state === "Sign up") {
        // Handle sign up logic here
        console.log("Sign up with:", username, email, password);
        try {
          const response = await api.post("/users/register", {
            username,
            email,
            password,
          });
          console.log("Sign up successful:", response.data);
          toast.success("Account created successfully!");
          setUser(response.data.user);
          navigate("/");
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Error signing up.");
        }
      } else {
        // Handle login logic here
        console.log("Login with:", email, password);
        try {
          const response = await api.post("/users/login", {
            email,
            password
          });
          console.log("Login successful:", response.data);
          toast.success("Logged in successfully!");
          setUser(response.data.user);
          navigate("/");
        } catch (error: any) {
          console.error("Error during login:", error);
          toast.error(error.response?.data?.message || "Error logging in.");
        }
      }
  } 


  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* ........left......... */}
      <img src={assets.logo_big} alt="" className="w-40"/>

      {/* ...........right........... */}
      <form style={{padding: "1.5rem"}} className="border-2 bg-white/8 text-white border-gray-500 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {state}
          <img src={assets.arrow_icon} alt="" className="w-5 cursor-pointer"/>
        </h2>
        {state == "Sign up" && <input value={username} onChange={(e) => setUsername(e.target.value)} style={{padding: "0.5rem"}} type="text" className=" border-gray-500 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Username" required />}
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{padding: "0.5rem"}} type="email" placeholder="Email Address" required className=" border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} style={{padding: "0.5rem"}} type="password" placeholder="Password" required className=" border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>

        <button onClick={handleSubmit} type="submit" style={{padding: "0.75rem"}} className="bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
          {state === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {state === "Sign up" ? (
            <p className="text-sm text-gray-600">Allredy have an account? <span onClick={() => setState("Login")} className="font-medium text-violet-500 cursor-pointer">Login here</span></p>
          ) : (
            <p className="text-sm text-gray-600">Create an account <span onClick={() => setState("Sign up")} className="font-medium text-violet-500 cursor-pointer">Click here</span></p>
          )}

        </div>
      </form>
      
    </div>
  )
}

export default Login