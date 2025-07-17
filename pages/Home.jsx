import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import Summary from "./Summary";

const Home = () => {
  return (
    <div className="text-white bg-black">
      <div className="relative flex flex-col justify-center items-center px-4 py-20 min-h-screen">
        <div className="absolute inset-0 bg-[url('./img/grid4.png')] bg-cover bg-no-repeat bg-center z-0"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            Turn Complex Topics <br />
            Into{" "}
            <span className="text-transparent bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text drop-shadow-[0_0_8px_rgba(255,115,0,0.6)]">
              𝑭𝒊𝒓𝒆 𝑵𝒐𝒕𝒆𝒔
            </span>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto">
            FireNotes helps you learn smarter by turning long, technical <br className="hidden sm:block" /> text into quick, clear summaries — powered by AI.
          </p>
          <div className="mt-8">
            <Link to="summarise" smooth={true} duration={500} offset={-50}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl sm:text-2xl px-6 py-2 cursor-pointer border border-white rounded hover:bg-white hover:text-black"
              >
                Try it out
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center px-4">
        <div className="text-3xl sm:text-4xl font-mono underline mb-6">
          Teck Stack
        </div>

        <div className="flex flex-wrap justify-center gap-6 px-4">
          <div className="w-24 h-24 rounded-full border-2 bg-[url('./img/react.jpg')] bg-center bg-cover bg-no-repeat"></div>
          <div className="w-24 h-24 rounded-full border-2 bg-[url('./img/fire.png')] bg-center bg-cover bg-no-repeat"></div>
          <div className="w-24 h-24 rounded-full border-2 bg-[url('./img/motion.jpeg')] bg-center bg-cover bg-no-repeat"></div>
          <div className="w-24 h-24 rounded-full border-2 bg-[url('./img/tail.jpeg')] bg-center bg-cover bg-no-repeat"></div>
        </div>
      </div>

      <div id="summarise" className="px-4 pt-12">
        <Summary />
      </div>
    </div>
  );
};

export default Home;
