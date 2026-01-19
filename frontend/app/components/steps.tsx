import { steps } from "@/lib/constants";
import React from "react";

const Steps = () => {
  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center h-[60vh] md:h-[50vh] pt-2">
      <div className="w-[90%] flex flex-col gap-3 items-center justify-center">
        <div className = 
        "flex flex-col gap-2 items-center justify-center">
          <h3 className="md:text-[30px] text-[20px] text-center font-bold text-black">Simple steps to better pet health</h3>
          <p className="text-gray-500 font-semibold text-[12px] md:text-[18px] text-center">
            We make it easy to monitor your pet's well being in just a few
            clicks, tailored for the busy lifestyle.
          </p>
        </div>
        <ul className ='flex flex-col md:flex-row items-center justify-evenly gap-4'>
          {steps.map((step) => (
            <li key={step.id} className ="bg-white rounded-lg p-4 flex flex-row md:flex-col gap-3 items-start">
              <div className="bg-[#d0fbd0] p-2 rounded-full text-[#15803d]">
                <step.icon />
              </div>
              <div>
                <h4 className="font-bold text-black text-[20px]">{step.id}.{" "}{step.title}</h4>
                <p className="text-gray-400 text-[14px] md:text-[18px] ">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Steps;
