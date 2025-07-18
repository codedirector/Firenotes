import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/Authcontext.jsx";
import { db } from "../src/firebase.jsx";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import summariser from "../utils/summariser.jsx";
import { motion } from "framer-motion";

const Summary = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [load,setload]=useState(false)
  const [txt, inputtxt] = useState("");
  const [summ, setSumm] = useState("");

  const handlechange = (e) => {
    inputtxt(e.target.value);
  };

  const handleclick = async () => {
  
    if (!user) {
      toast.error("Please Login first");
    } else if (txt != "") {  setload(true)
      const data = await summariser(txt);
      setSumm(data);
      setload(false);
    }
  };

  const handlecopy = async () => {
    try {
      await navigator.clipboard.writeText(summ);
      toast.success("Copied to Clipboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  const addsumm = async () => {
    if (!user) {
      toast.error("Login to save your summary");
      return;
    }
    if (!summ.trim()) return;
    try {
      await addDoc(collection(db, "Summarise"), {
        uid: user.uid,
        text: summ,
        createdon: serverTimestamp(),
      });
      toast.success("Summary saved!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[url('/img/239.jpg')] bg-no-repeat bg-cover bg-black text-white px-4 py-12">
      <div className="flex items-center justify-center underline text-3xl sm:text-4xl font-mono mb-10 text-center">
        From Text to Takeaways
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-2xl text-center mb-6 p-2 border border-dotted border-white rounded inline-block mx-auto">
  Your text here
</p>

          <textarea
            className="bg-white/25 resize-none text-xl sm:text-1xl text-white w-full min-h-[200px] p-3 rounded"
            onChange={handlechange}
          ></textarea>
          <br />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto w-40 text-xl sm:text-2xl px-5 py-2 border border-white rounded hover:bg-white hover:text-black"
            onClick={handleclick}
          >
            Summarize
          </motion.button>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-2xl text-center mb-6 p-2 border border-dotted border-white rounded inline-block mx-auto">
            Summary
          </p>
          {!load?(<textarea
            className="bg-white/25 resize-none text-xl sm:text-1xl text-white w-full min-h-[200px] p-3 rounded"
            value={summ}
            readOnly
          ></textarea>):( <div>Summarising...</div> )}
          <br />
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl sm:text-2xl px-5 py-2 border border-white rounded hover:bg-white hover:text-black"
              onClick={addsumm}
            >
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl sm:text-2xl px-5 py-2 border border-white rounded hover:bg-white hover:text-black"
              onClick={handlecopy}
            >
              Copy
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
