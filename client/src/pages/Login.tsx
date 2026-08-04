import assets from "../assets/assets"
import { useState } from "react"

const Login = () => {

  const [state, setState] = useState("Sign up");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log(fullName);
      console.log(email);
      console.log(password);
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
        {state == "Sign up" && <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={{padding: "0.5rem"}} type="text" className=" border-gray-500 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Full Name" required />}
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