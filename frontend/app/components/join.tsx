"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

const Join = () => {
  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className=" w-[80%] md:w-[60%] rounded-xl bg-[#dff6df] flex flex-col gap-5 items-center justify-center p-4 py-12 md:py-20"
      >
        <h2 className="md:text-[45px]/12 text-[25px]/9 md:w-[60%] text-black text-center font-extrabold">
          Ready to give them the best care?
        </h2>
        <p className="text-[14px] md:text-[18px] text-center text-black font-light">
          Join the beta today and get free premium access for the first 6
          months.
        </p>
        <div className="flex flex-col gap-2 items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Link
              href={"/symptoms"}
              className="md:my-3 hover:text-white text-[12px] md:text-[18px] cursor-pointer border font-bold py-2 px-2 md:py-2 md:px-6 bg-primary rounded-lg text-black hover:bg-secondary-foreground"
            >
              Get Started
            </Link>
          </motion.div>

          <span className="text-gray-500 text-[10px] md:text-[15px] text-center font-semibold">
            No credit card required.
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Join;
