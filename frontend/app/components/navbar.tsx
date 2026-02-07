"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaPaw } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { AnimatePresence, motion } from "motion/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Symptom checker",
      path: "/symptoms",
    },
    {
      name: "Alerts",
      path: "/alerts",
    },
    {
      name: "Vets",
      path: "/vets",
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="sticky top-0 z-10 bg-background-gray shadow-md w-full flex flex-row justify-center items-center  p-4 ">
      <div className="flex flex-row items-center justify-between w-[90%]">
        <div className="flex flex-row gap-2 items-center md:items-center">
          <div className="text-2xl text-primary">
            <FaPaw />
          </div>
          <h3 className="text-[25px] font-extrabold text-black">Mune</h3>
        </div>

        <ul className="hidden md:flex flex-row gap-3">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="hover:bg-primary hover:text-white p-2 text-black text-[15px] rounded-lg font-semibold  cursor-pointer"
            >
              <a href={link.path}>{link.name}</a>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          {isOpen ? (
            <button
              className="text-2xl font-bold text-black  hover:text-primary cursor-pointer"
              onClick={() => toggleMenu()}
            >
              <ImCross />
            </button>
          ) : (
            <button
              className="text-2xl font-bold text-black  hover:text-primary cursor-pointer"
              onClick={() => toggleMenu()}
            >
              <TiThMenu />
            </button>
          )}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute left-0 top-full w-full bg-background-gray shadow-md md:hidden h-[40vh] flex flex-col items-center justify-center"
            >
              <motion.ul
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center gap-2 p-4 w-full"
              >
                {navLinks.map((link) => (
                  <motion.li
                    variants={item}
                    key={link.name}
                    className="w-full flex flex-col items-center justify-center"
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg p-2 text-center mb-1 text-[15px] font-semibold text-black hover:bg-primary hover:text-white w-full"
                    >
                      {link.name}
                    </Link>
                    <hr className="w-full" />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <div>
          <Link href={'/symptoms'} className="cursor-pointer border font-bold p-2 bg-primary rounded-lg text-black text-[15px] hover:bg-secondary-foreground hover:text-white">
            Get Started
          </Link>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
