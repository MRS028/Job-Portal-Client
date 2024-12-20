import { easeOut } from "motion";
import { motion } from "motion/react";
import React from "react";
import team1 from "../../assets/team-01.jpg";
import team2 from "../../assets/team-02.jpg";
const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-screen overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
            src={team1}
            className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-8 border-blue-400 shadow-2xl"
            animate={{ y: [50, 100, 50] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.img
            src={team2}
            className="max-w-sm overflow-hidden w-64 rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-8 border-blue-400 shadow-2xl"
            animate={{ x: [100, 150, 100] }}
            transition={{ duration: 10, delay: 5, repeat: Infinity }}
          />
        </div>
        <div className="flex-1">
          <motion.h1
            animate={{ x: 40 }}
            transition={{
              duration: 2,
              delay: 1,
              ease: easeOut,
              repeat: Infinity,
            }}
            className="text-5xl font-bold"
          >
            Latest
            <motion.span
              animate={{ color: ["#FF8C00", "#7FFF00", "#0000FF"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Jobs
            </motion.span>
            For You!
          </motion.h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
