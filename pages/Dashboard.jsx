// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { dimensionValueTypes, motion } from "framer-motion";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { db } from "../src/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import SummaryCard from "../components/SummaryCard";
const Dashboard = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [load, setload] = useState(true);
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      const q = query(
        collection(db, "Summarise"),
        where("uid", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const summariesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSummaries(summariesArray);
      setload(false);
    };

    fetchSummaries();
  }, [user]);

  const deleteCard = async (id) => {
    try {
      setSummaries((prev) => prev.filter((item) => item.id !== id));
      await deleteDoc(doc(db, "Summarise", id));
      toast.success("Summary deleted");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-[url('/img/239.jpg')] bg-no-repeat bg-cover h-svh flex flex-col  items-center px-4 py-10 bg-black text-white ">
      <div>
        <h1 className="font-bold text-4xl mb-2">Dashboard</h1>
        <p className="text-lg  text-gray-300 mb-6">
          Welcome, {user.displayName}
        </p>
        <div>
          {load ? (
            <p className="text-white/80 text-sm animate-pulse">
              ⏳ Loading summaries...
            </p>
          ) : summaries.length === 0 ? (
            <p className="text-white/70 text-base">No summaries found.</p>
          ) : (
            <div>
              <div className="texr-2xl flex justify-center pb-5 underline font-semibold">
                Your Saved Firenotes
              </div>
              <div className=" h-100 cursor-none scrollbar scrollbar-track-black scrollbar-thumb-white overflow-y-auto   p-5">
                <div className="w-full max-w-3xl space-y-4">
                  {summaries.map((summary, i) => (
                    <SummaryCard
                      key={i + 1}
                      id={summary.id}
                      date={summary.createdon}
                      data={summary.text}
                      delCard={()=>deleteCard(summary.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="text-2xl mt-5 px-5 py-1 cursor-pointer border border-white rounded hover:bg-white hover:text-black"
      >
        Logout
      </motion.button>
    </div>
  );
};

export default Dashboard;
