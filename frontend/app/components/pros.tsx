"use client";
import React from "react";
import cats from "../../public/assets/landing.png";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { pros } from "@/lib/constants";
import { motion } from "motion/react";

const Pros = () => {
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
    <div className="bg-secondary-foreground w-full flex flex-col items-center justify-center py-20 md:py-28">
      <div className="w-[90%] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="md:w-1/2 w-full flex flex-col md:gap-6 gap-3  items-start">
          <motion.p
            initial={{ y: -4 }}
            animate={{ y: [-4, 4, -4] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-primary tracking-wider bg-[#185318] py-2 px-3 rounded-[20px] text-[12px]"
          >
            BUILT FOR KENYA
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-white text-[30px] md:text-[40px] font-bold"
          >
            Local challenges require local solutions.
          </motion.h2>
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3"
          >
            {pros.map((pro) => (
              <motion.li
                variants={item}
                key={pro.title}
                className="flex flex-col  gap-3 items-start "
              >
                <div className="flex flex-row items-center gap-3">
                  <pro.icon className="text-primary text-[20px] font-semibold" />
                  <h3 className="text-white font-bold text-[24px]">
                    {pro.title}
                  </h3>
                </div>
                <div className="pl-8 text-[14px] md:text-[18px]">
                  <p className="text-gray-400 font-semibold">
                    {pro.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="md:w-1/2 w-full flex flex-row items-center justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative md:w-[90%] w-full h-80 md:h-112.5 rounded-lg"
          >
            <Image fill className="object-cover rounded-xl" src={cats} alt="" />
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="absolute bottom-10 left-5 flex flex-row p-4 gap-2 justify-center items-center  w-[90%] bg-cover rounded-lg bg-black/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]  border border-white/18"
            >
              <div className="text-black text-[15px] font-extrabold bg-primary p-1 rounded-full">
                <TiTick />
              </div>
              <p className="text-secondary text-[12px] font-light">
                Tick fever outbreake detected in Karen. Alert sent.
              </p>
            </motion.div>
          </motion.div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Pros;
