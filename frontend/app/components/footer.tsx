import { footerLinks } from "@/lib/constants";
import { FaPaw } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-white w-full flex flex-col gap-10 items-center justify-center pt-20 pb-5 md:pt-28 md:pb-10">
      <div className="w-[90%] flex flex-col md:flex-row gap-4 items-center justify-center md:justify-evenly">
        <div className="w-full md:w-[35%] flex flex-col gap-4 items-start">
          <div className="flex flex-row gap-2 items-center md:items-center">
            <div className="text-2xl text-primary">
              <FaPaw />
            </div>
            <h3 className="text-[25px] font-extrabold text-black">Mune</h3>
          </div>
          <p className="text-[14px] md:text-[18px]  text-black font-light">
            Empowering Kenyan pet ownwers with technology and community.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-evenly gap-4 md:w-[65%] w-full">
          {footerLinks.map((footerLink) => (
            <div
              key={footerLink.title}
              className="flex flex-col items-start gap-3 flex-1"
            >
              <h2 className="text-[14px] md:text-[18px] font-bold text-black">
                {footerLink.title}
              </h2>
              <ul className="flex flex-col gap-2 text-[13px] md:text-[17px]">
                {footerLink.links.map((link) => (
                  <li className="cursor-pointer text-black hover:text-primary">
                    {link}
                  </li>
                ))}
              </ul>
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
