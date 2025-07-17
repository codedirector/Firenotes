import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../src/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");

  const handleClick = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    if(password.trim.length<6)
    {
       toast.error("Password should be of 6 chars");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      navigate("/login");
      toast.success("SignUp Successful");
      //   console.log("User created:", userCredential.user);
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-[url('/img/239.jpg')] bg-no-repeat bg-cover h-svh flex flex-col justify-center items-center text-white bg-black">
      <div className="flex items-center justify-center underline text-4xl font-mono mb-10">
        SignUp
      </div>
      <div className="bg-white/10 border-2 border-white p-8 rounded max-w-md mx-auto text-white">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="name">Name: </label>
            <input
              type="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="Enter name"
              name="name"
              className="bg-black"
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Enter email"
              name="email"
              className="bg-black"
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Enter password(6-10)"
              name="password"
              className="bg-black"
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

export default SignUp;
