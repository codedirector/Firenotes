import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
const Login = () => {
    const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleClick = async () => {
    if (!email || !password) {
  toast.error("Email and password required");
  return;
}
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login Successful");
      // console.log("Logged in user:", userCredential.user);
      navigate('/dashboard')
    } catch (error) {
      console.log("hello")
      toast.error("Login Failed: " + error.message);
      console.error("Login error:", error.message);
    }
  };
  return (
    <div className="bg-[url('./img/239.jpg')] bg-no-repeat bg-cover h-svh flex flex-col justify-center items-center text-white bg-black">
  <div className="flex items-center justify-center underline text-4xl font-mono mb-10">
  Login
</div>

<div className="bg-white/10 border-2 border-white p-8 rounded max-w-md mx-auto text-white">
  <div className="flex flex-col gap-6">
    <div className="flex flex-col">
      <label htmlFor="email" className="mb-1 font-semibold">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Enter email"
        className="bg-black p-2 rounded text-white placeholder-gray-400 border border-white focus:outline-none focus:ring-2 focus:ring-white"
        name="email"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="password" className="mb-1 font-semibold">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Enter password"
        className="bg-black p-2 rounded text-white placeholder-gray-400 border border-white focus:outline-none focus:ring-2 focus:ring-white"
        name="password"
      />
    </div>

  </div>
</div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="text-2xl mt-5 px-5 py-1 cursor-pointer border border-white rounded hover:bg-white hover:text-black"
      >
        Submit
      </motion.button>
    </div>
    
  );
};

export default Login;
