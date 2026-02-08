"use client";
import { precautions } from "@/lib/constants";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import hero from "../../../public/assets/hero.png";
import { FaStarOfLife } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { FaMap } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";
import Link from "next/link";
import { motion } from "motion/react";
import api from "@/lib/axios";

interface Outbreak {
  diseaseName: string;
  description: string;
  location: string;
  startDate: string;
  status: string;
  reportedBy: string;
  vetId: string;
}

interface OutbreakResponse {
  outbreak: Outbreak;
}

const DetailedAlert = () => {
  const { id } = useParams<{ id: string }>();
  const [outbreak, setOutbreak] = useState<Outbreak | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOutbreak = async () => {
      try {
        const response = await api.get<OutbreakResponse>(
          `/outbreaks/${id}`,
        );
        setOutbreak(response.data.outbreak);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "Failed to fetch outbreak",
          );
        } else {
          toast.error("Something went wrong");
        }
      }
    };
    fetchOutbreak();
  }, [id]);

  const EmergencyContacts = [
    {
      title: "City animal hospital",
      phone: "(254) 123-4567",
      available: "24/7 Emergency",
    },
    {
      title: "Pet Poison Helpline",
      phone: "(254) 123-4567",
      available: "24/7 Available",
    },
  ];

  const container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-16 md:py-24">
      <div className="w-[90%] flex flex-col md:flex-row gap-10">
        <div className="md:w-[70%] w-full flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {outbreak ? (
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="bg-white flex flex-col items-start justify-center w-full gap-4 rounded-xl p-4"
              >
                {outbreak.status === "ACTIVE" ? (
                  <motion.span
                    initial={{ y: -4 }}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700"
                  >
                    ACTIVE
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ y: -4 }}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700"
                  >
                    RESOLVED
                  </motion.span>
                )}

                <h2 className="text-[30px] font-bold text-black">
                  {outbreak.diseaseName}
                </h2>
                <p className="text-[18px] text-gray-600">
                  {outbreak.description}
                </p>
                <hr className="w-full" />
                <div className="flex flex-row gap-5 ">
                  <span className="flex flex-row gap-3 items-center justify-center">
                    <div>
                      <FaLocationDot className="font-bold text-[15px]" />
                    </div>
                    <p className="text-sm text-gray-500">{outbreak.location}</p>
                  </span>
                  <span className="flex flex-row gap-3 items-center justify-center">
                    <div>
                      <MdDateRange className="font-bold text-[15px]" />
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(outbreak.startDate).toLocaleDateString()}
                    </p>
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="flex justify-center items-center h-[50vh] md:h-[80vh]">
                <HashLoader color="#13ec13" />
              </div>
            )}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl p-4"
            >
              {precautions.map((precaution) => (
                <motion.div
                  variants={item}
                  key={precaution.title}
                  className="flex items-start gap-4 bg-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 text-2xl">
                    <precaution.icon />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-black text-lg md:text-xl font-semibold">
                      {precaution.title}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      {precaution.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="md:w-[30%] flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="bg-white px-4 py-5 rounded-xl flex flex-col gap-4"
          >
            <motion.h3
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="text-[18px] text-black font-bold"
            >
              Quick Actions
            </motion.h3>
            <motion.div
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Link
                href={"/vets"}
                className="flex flex-row gap-4 w-full items-center justify-center text-md border rounded-lg p-3  font-bold cursor-pointer bg-[#1e293b] text-white hover:bg-[#425f8d]"
              >
                <span>
                  <FaStarOfLife />
                </span>
                Find Emergency Vet
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex flex-row gap-4 w-full items-center justify-center text-md border rounded-lg p-3  font-bold cursor-pointer text-gray-700 hover:bg-[#1e293b] hover:text-white"
            >
              <span>
                <FaCirclePlus />
              </span>
              Report Symptoms
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex flex-row gap-4 w-full items-center justify-center text-md border rounded-lg p-3  font-bold cursor-pointer text-gray-700 hover:bg-[#1e293b] hover:text-white"
            >
              <span>
                <FaMap />
              </span>
              View Outbreak Map
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="bg-white px-4 py-5 rounded-xl flex flex-col gap-4"
          >
            <motion.h3
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 3 }}
              className="text-[18px] text-black font-bold"
            >
              Emergency Contacts
            </motion.h3>
            <div className="flex flex-col gap-3">
              {EmergencyContacts.map((contact) => (
                <div key ={contact.title} className="flex flex-row gap-3 items-start">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-gray-700 text-[15px]">
                    <FaSquarePlus />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 3 }}
                    className="flex flex-col gap-2 w-full"
                  >
                    <h4 className="text-black font-bold ">{contact.title}</h4>
                    <p className="text-primary font-semibold">
                      {contact.phone}
                    </p>
                    <p className="text-gray-400 text-sm">{contact.available}</p>
                    <hr className="w-full" />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative w-full h-80 rounded-lg overflow-hidden"
          >
            <Image fill className="object-cover rounded-xl" src={hero} alt="" />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="absolute bottom-5 left-5 flex flex-col p-6 gap-2 justify-center items-start w-[90%] z-10"
            >
              <h1 className="text-primary text-[15px] font-bold">MUNE</h1>
              <p className="text-secondary text-2xl font-bold">
                Get real-time alerts four your neighbourhood.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAlert;
