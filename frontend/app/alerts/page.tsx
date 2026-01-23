'use client'
import AlertsForm from "../components/AlertForm";
import { CiEdit } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Reporter {
  id: string;
  name: string;
}
interface Outbreak {
  id : string;
  diseaseName: string;
  description : string;
  location : string;
  startDate : string;
  status : string;
  reportedBy : Reporter;
} 

interface OutbreakResponse {
  outbreaks : Outbreak [];
}

const alertsPage = () => {
  const [outbreaks, setOutbreaks] = useState<Outbreak[]>([]);

  // const isActive = outbreak.status === "ACTIVE";
  useEffect(() => {
    const fetchOutbreaks = async () => {
      try {
        const response = await axios.get<OutbreakResponse>(`http://localhost:5000/outbreaks`);
        setOutbreaks(response.data.outbreaks || []);
        console.log(response.data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message || "Failed to fetch outbreaks");
        } else {
          alert("Something went wrong");
        }
      }
    };
    fetchOutbreaks();
  }, []);

  const mockOutbreaks = [
    {
      id: "1",
      diseaseName: "Cat Flu",
      description: "Increased respiratory infections reported",
      location: "Nairobi",
      startDate: "2026-01-10",
      status: "ACTIVE",
      reportedBy: { id: "vet1", name: "Dr. Jane" },
    },
  ];

  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-20 md:py-28">
      <div className="w-[90%] flex flex-col gap-10 md:gap-20 items-center justify-center">
        <div className="w-full">
          <AlertsForm />
        </div>

        <div className="w-full flex flex-col gap-5">
          <h2 className="text-[20px] md:text-[30px] font-bold text-black">
            Recent Alerts{" "}
          </h2>
          {outbreaks.map((outbreak) => (
            <div
              key={outbreak.id}
              className="bg-white rounded-xl p-5 border flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-black">
                  {outbreak.diseaseName}
                </h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                  {outbreak.status}
                </span>
              </div>

              {/* <p className="text-[18px] text-gray-600">
                {outbreak.description}
              </p> */}

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
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-row justify-evenly w-full">
                  <Link
                    href={`alerts/${outbreak.id}`}
                    className="border-2 p-2 rounded-lg cursor-pointer font-bold bg-blue-400 hover:bg-blue-200 text-[25px] flex items-center gap-2 border-black"
                  >
                    <CgDetailsMore className="md:hidden" />
                    <span className="hidden md:inline text-[15px]">
                      More Details
                    </span>
                  </Link>
                  <button className="border-2 p-2 rounded-lg cursor-pointer font-bold bg-blue-400 hover:bg-blue-200 text-[25px] flex items-center gap-2 border-black">
                    <CiEdit className="md:hidden" />
                    <span className="hidden md:inline text-[15px]">Edit</span>
                  </button>

                  <button className="border-2 p-2 rounded-lg cursor-pointer font-bold bg-red-400 hover:bg-red-200 text-[25px] flex items-center gap-2 border-black">
                    <MdOutlineDeleteOutline className="md:hidden" />
                    <span className="hidden md:inline text-[15px]">Delete</span>
                  </button>
                </div>
                <hr />

                <span className="text-sm text-gray-500">
                  {/* Reported by {outbreak.reportedBy.name} */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default alertsPage;
