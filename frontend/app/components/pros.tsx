import React from "react";
import cats from "../../public/assets/landing.png";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { pros } from "@/lib/constants";

const Pros = () => {
  return (
    <div className="bg-secondary-foreground w-full flex flex-col items-center justify-center min-h-screen pt-5">
      <div className="w-[90%] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="md:w-1/2 w-full flex flex-col md:gap-6 gap-3  items-start">
          <p className="text-primary tracking-wider bg-[#185318] py-2 px-3 rounded-[20px] text-[12px]">
            BUILT FOR KENYA
          </p>
          <h2 className="text-white text-[30px] md:text-[40px] font-bold">
            Local challenges require local solutions.
          </h2>
          <ul className="flex flex-col gap-3">
            {pros.map((pro) => (
              <li key={pro.title} className="flex flex-col  gap-3 items-start ">
                <div className="flex flex-row items-center gap-3">
                  <pro.icon className="text-primary text-[20px] font-semibold" />
                  <h3 className="text-white font-bold text-[24px]">
                    {pro.title}
                  </h3>
                </div>
                <div className="pl-8 text-[14px] md:text-[18px]">
                  <p className="text-gray-400 font-semibold">{pro.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 w-full flex flex-row items-center justify-center md:justify-end">
          <div className="relative md:w-[90%] w-full h-80 md:h-112.5 rounded-lg">
            <Image fill className="object-cover rounded-xl" src={cats} alt="" />
            <div className="absolute bottom-10 left-5 flex flex-row p-4 gap-2 justify-center items-center  w-[90%] bg-cover rounded-lg bg-black/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]  border border-white/18">
              <div className="text-black text-[15px] font-extrabold bg-primary p-1 rounded-full">
                <TiTick />
              </div>
              <p className="text-secondary text-[12px] font-light">
                Tick fever outbreake detected in Karen. Alert sent.
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Pros;
