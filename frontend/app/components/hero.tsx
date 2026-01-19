import hero from "../../public/assets/hero.png";
import Image from "next/image";
import hero_svg from "../../public/assets/hero_svg.png";

const Hero = () => {
  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pt-2">
      <div className="w-[90%] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="md:w-1/2 w-full flex flex-col md:gap-6 gap-3 md:items-start items-center">
          <h1 className="md:text-[55px]/13 text-[30px]/9 font-bold text-black text-center md:text-left">
            Keep Your Furry Friend{" "}
            <span className="text-primary">Healthy & Happy.</span>
          </h1>
          <p className="text-gray-500 text-[12px] md:text-[18px] text-center md:text-left font-semibold">
            Kenya's first early-warning system for pet health. Detect issues
            before they become emergencies and connect with local vets
            instantly.
          </p>
          <button className="md:my-3 text-[12px] md:text-[18px] cursor-pointer border font-bold py-2 px-2 md:py-2 md:px-6 bg-primary rounded-lg text-black hover:bg-secondary-foreground">
            Get Started
          </button>
          <div className="flex flex-row items-center gap-3 w-full justify-center md:justify-start">
            <div className="md:w-20 w-15">
              <Image src={hero_svg} alt="" />
            </div>
            <p className="text-black md:text-gray-400 text-[10px] md:text-[12px]">
              Trusted by 500+ Nairobi Pet Owners
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full flex flex-row items-center justify-center md:justify-end">
          <div
            className="relative md:w-[90%] w-full h-80 md:h-112.5 rounded-xl 
                  shadow-[0_0_60px_10px_rgba(34,197,94,0.35)]
"
          >
            <Image
              src={hero}
              alt="Hero Image"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
