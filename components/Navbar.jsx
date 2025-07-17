import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext.jsx";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [log, setlog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setlog(!!user);
  }, [user]);

  return (
    <div className="flex justify-center items-center font-medium bg-black">
      <div
        className="border-3 flex flex-col sm:flex-row justify-between items-center 
        relative bg-[url('/img/dot4.png')] bg-center bg-cover text-white mt-8  px-3 mb-2 rounded-4xl bg-white/18"
      >
        <div className="px-4 sm:px-7 py-2 mb-2 sm:mb-0 w-full flex justify-between items-center">
          <Link to="/">🔥FireNotes</Link>

          <button
            className="sm:hidden text-2xl ml-15"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>


        <div className="p-3 hidden sm:flex flex-col sm:flex-row sm:space-x-15 space-y-2 sm:space-y-0 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {!loading && (
            <div className="flex flex-col sm:flex-row sm:space-x-15 space-y-2 sm:space-y-0 items-center">
              {log ? (
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  <Link to="/signup" className="hover:underline">
                    Signup
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full sm:hidden flex flex-col items-center space-y-2 pb-4"
            >
              <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              {!loading && (
                <>
                  {log ? (
                    <Link to="/dashboard" className="hover:underline" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="hover:underline" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                      <Link to="/signup" className="hover:underline" onClick={() => setIsOpen(false)}>
                        Signup
                      </Link>
                    </>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
