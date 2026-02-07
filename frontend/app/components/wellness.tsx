"use client";
import { insights } from "@/lib/constants";
import React from "react";
import { motion } from "motion/react";

const Wellness = () => {
  const container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-20 md:py-28">
      <div className="w-[90%] flex flex-col gap-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="md:text-[30px] text-[20px] text-center font-bold text-black">
            Complete Wellness Management
          </h3>
          <p className="text-gray-500 font-semibold text-[12px] md:text-[18px] text-center">
            Mune isn't just for emergencies. It's your daily companion for a
            long, happy life with your pet.
          </p>
        </motion.div>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row items-stretch justify-evenly gap-4"
        >
          {insights.map((insight) => (
            <motion.li
              variants={item}
              key={insight.title}
              className="bg-[#f0fdf4] rounded-lg p-6 flex flex-col gap-4 items-center justify-center"
            >
              <div className=" text-[#15803d] text-5xl">
                <insight.icon />
              </div>
              <h4 className="font-bold text-black text-[20px] text-center">
                {insight.title}
              </h4>
              <p className="text-[14px] md:text-[18px] text-center text-black font-light">
                {insight.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Wellness;
