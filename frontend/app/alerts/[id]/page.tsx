"use client";
import { precautions } from "@/lib/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";

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
        const response = await axios.get<OutbreakResponse>(
          `http://localhost:5000/outbreaks/${id}`,
        );
        setOutbreak(response.data.outbreak);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message || "Failed to fetch outbreak");
        } else {
          alert("Something went wrong");
        }
      }
    };
    fetchOutbreak();
  }, [id]);
  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-16 md:py-24">
      <div className="w-[90%] flex flex-col md:flex-row gap-10">
        <div className="md:w-[70%] w-full flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {outbreak ? (
              <div className="bg-white flex flex-col items-start justify-center w-full gap-4 rounded-xl p-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                  {outbreak.status}
                </span>
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
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl p-4">
              {precautions.map((precaution) => (
                <div
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
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-[30%]"></div>
      </div>
    </div>
  );
};

export default DetailedAlert;
