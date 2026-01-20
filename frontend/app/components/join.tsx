import React from "react";

const Join = () => {
  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-20 md:py-28">
      <div className=" w-[80%] md:w-[60%] rounded-xl bg-[#dff6df] flex flex-col gap-5 items-center justify-center p-4 py-12 md:py-20">
        <h2 className="md:text-[45px]/12 text-[25px]/9 md:w-[60%] text-black text-center font-extrabold">
          Ready to give them the best care?
        </h2>
        <p className="text-[14px] md:text-[18px] text-center text-black font-light">
          Join the beta today and get free premium access for the first 6
          months.
        </p>
        <div className="flex flex-col gap-2 items-center justify-center">
          <button className="md:my-3 text-[12px] md:text-[18px] cursor-pointer border font-bold py-2 px-2 md:py-2 md:px-6 bg-primary rounded-lg text-black hover:bg-secondary-foreground">
            Get Started
          </button>

          <span className="text-gray-500 text-[10px] md:text-[15px] text-center font-semibold">No credit card required.</span>
        </div>
      </div>
    </div>
  );
};

export default Join;
