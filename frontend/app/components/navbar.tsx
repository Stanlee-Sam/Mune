import React from "react";
import { FaPaw } from "react-icons/fa6";

const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Symptom checker",
      path: "/symptoms",
    },
    {
      name: "Alerts",
      path: "/alerts",
    },
  ];
  return (
    <nav className="sticky top-0 z-10 bg-background-gray shadow-md w-full flex flex-row justify-center items-center  p-4 ">
      <div className = "flex flex-row items-center justify-between w-[90%]">
        <div className="flex flex-row gap-2 items-start md:items-center">
          <div className="text-2xl text-primary">
            <FaPaw />
          </div>
          <h3 className="text-[25px] font-extrabold text-black">Mune</h3>
        </div>
        <ul className="flex flex-row gap-3">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="hover:bg-primary p-2 text-black text-[15px] rounded-lg font-semibold  cursor-pointer"
            >
              <a href={link.path}>{link.name}</a>
            </li>
          ))}
        </ul>
        <div>
          <button className="cursor-pointer border font-bold p-2 bg-primary rounded-lg text-black text-[15px] hover:bg-secondary-foreground">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
