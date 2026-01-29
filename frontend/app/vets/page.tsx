import React from "react";
import vet from "../../public/assets/vet.png";
import Image from "next/image";
import { FaCirclePlus, FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";

const Vets = () => {
  const clinics = [
    {
      id: "1",
      img: vet,
      name: "Happy Paws Veterinary Clinic",
      location: "Nairobi, Westlands",
      phone: "+254 712 345 678",
      emergencyAvailable: true,
    },
    {
      id: "2",
      img: vet,

      name: "Purrfect Care Vet Center",
      location: "Nairobi, Karen",
      phone: "+254 798 765 432",
      emergencyAvailable: false,
    },
    {
      id: "3",
      img: vet,

      name: "FurEver Friends Vet Clinic",
      location: "Nairobi, Rongai",
      phone: "+254 701 234 567",
      emergencyAvailable: true,
    },
    {
      id: "4",
      img: vet,

      name: "Healthy Paws Veterinary Services",
      location: "Nairobi, Langata",
      phone: "+254 709 876 543",
      emergencyAvailable: false,
    },
    {
      id: "5",
      img: vet,

      name: "Tail Waggers Vet Clinic",
      location: "Nairobi, Kileleshwa",
      phone: "+254 711 223 344",
      emergencyAvailable: true,
    },
  ];

  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-16 md:py-24">
      <div className="w-[90%] flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col md:flex-row w-full items-start md:justify-between gap-3">
            <div className="flex flex-col  gap-2 items-start justify-center w-[70%]">
              <h3 className="md:text-[30px] text-[20px] text-left font-bold text-black">
                Find Trusted Veterinary Care
              </h3>
              <p className="text-gray-500 font-semibold text-[15px] md:text-[18px] text-left">
                Connect with verified clinics and emergency services across
                Kenya. Your pet's health is our priority.
              </p>
            </div>
            <button className="flex flex-row gap-2 border bg-primary items-center justify-center py-2 px-2 md:py-2 md:px-6 rounded-lg text-black">
              <span>
                <FaCirclePlus />
              </span>
              <p className="font-bold "> Add Clinic</p>
            </button>
          </div>
          <div className="bg-white rounded-lg p-2 flex flex-row justify-between items-center w-full">
            <div className="flex flex-col md:flex-row justify-between items-left gap-2 w-[80%]">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search by name, services or keyword.."
                  className="border p-2 rounded-lg bg-gray-100 w-full text-[15px] md:text-[18px] pl-7"
                />
                <span className="absolute top-3.5 left-1 text-gray-500">
                  <IoMdSearch />
                </span>
              </div>
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Nairobi, Mombasa or near me.."
                  className="border p-2 rounded-lg bg-gray-100 w-full text-[15px] md:text-[18px] pl-7"
                />
                <span className="absolute top-3.5 left-1 text-gray-500">
                  <FaLocationDot />
                </span>
              </div>
            </div>
            <button className="bg-[#1e293b] text-white border p-2 rounded-lg font-semibold cursor-pointer w-20 md:w-50 h-12  text-[12px] md:text-[18px]">
              Find a vet
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <div className="flex flex-col items-start w-full">
            <h2 className="text-[20px] md:text-[30px] font-bold text-black text-left">
              Featured Clinics
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 w-full">
            {clinics.map((clinic) => (
              <div key={clinic.id} className="bg-white rounded-xl w-full">
                <div className="relative w-full h-60 md:h-72 rounded-t-xl overflow-hidden">
                  <Image
                    src={clinic.img}
                    alt={clinic.name}
                    fill
                    className="object-cover"
                  />
                  <div className="flex flex-row gap-1 absolute top-2 right-2 z-10">
                    <span className="p-2 bg-white rounded-full cursor-pointer hover:bg-black text-black hover:text-white">
                      <IoPencil />
                    </span>
                    <span className="p-2 bg-white rounded-full cursor-pointer hover:bg-black text-black hover:text-white">
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                  <p className="absolute bottom-2 left-2 z-10">
                    {clinic.emergencyAvailable && (
                      <span className="bg-primary text-black text-xs font-semibold px-3 py-1 rounded-full">
                        24/7 Emergency
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-2 p-4">
                  <h2 className="text-[15px] md:text-[18px] font-bold">
                    {clinic.name}
                  </h2>
                  <div className="flex flex-row gap-2 items-center justify-start">
                    <span className="text-[15px] md:text-[18px] text-gray-500">
                      <FaLocationDot />
                    </span>
                    <p className="text-[15px] md:text-[18px] text-gray-500">
                      {clinic.location}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-start">
                    <span className="text-[15px] md:text-[18px] text-gray-500">
                      <FaPhoneAlt />
                    </span>
                    <p>{clinic.phone}</p>
                  </div>
                  <button className="bg-primary text-white border p-2 rounded-lg font-bold cursor-pointer w-full text-[15px] md:text-[18px]">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vets;
