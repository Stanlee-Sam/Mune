'use client'
"use client";
import { footerLinks } from "@/lib/constants";
import { FaPaw } from "react-icons/fa6";
import { motion } from "motion/react";

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white w-full flex flex-col gap-10 items-center justify-center pt-20 pb-5 md:pt-28 md:pb-10">
      <div className="w-[90%] flex flex-col md:flex-row gap-4 items-center justify-center md:justify-evenly">
        <motion.div
        initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        className="w-full md:w-[35%] flex flex-col gap-4 items-start">
          <div className="flex flex-row gap-2 items-center md:items-center">
            <div className="text-2xl text-primary">
              <FaPaw />
            </div>
            <h3 className="text-[25px] font-extrabold text-black">Mune</h3>
          </div>
          <p className="text-[14px] md:text-[18px]  text-black font-light">
            Empowering Kenyan pet ownwers with technology and community.
          </p>
        </motion.div>
        <div className="flex flex-col md:flex-row items-stretch justify-evenly gap-4 md:w-[65%] w-full">
          {footerLinks.map((footerLink) => (
            <div
              key={footerLink.title}
              className="flex flex-col items-start gap-3 flex-1"
            >
              <h2 className="text-[14px] md:text-[18px] font-bold text-black">
                {footerLink.title}
              </h2>
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col gap-2 text-[13px] md:text-[17px]"
              >
                {footerLink.links.map((link) => (
                  <motion.li
                    key={link}
                    variants={item}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="cursor-pointer text-black hover:text-primary"
                  >
                    {link}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-2 h-0 border-gray-500 w-[90%]"></div>
      <div className="w-[90%]">
        <p className="text-[14px] md:text-[18px] text-black font-light">
          Copyright © 2026 Mune. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
