"use client";
import AlertsForm from "../components/AlertForm";
import { CiEdit } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromToken } from "@/utils/auth";
import { ClipLoader, HashLoader } from "react-spinners";
import api from "@/lib/axios";
import { toast } from "sonner";

interface Reporter {
  id: string;
  name: string;
}
interface Outbreak {
  id: string;
  diseaseName: string;
  description: string;
  location: string;
  startDate: string;
  status: string;
  reportedBy: Reporter;
}

interface OutbreakResponse {
  outbreaks: Outbreak[];
}

interface updatedOutbreakResponse {
  updatedOutbreak: Outbreak;
}

const alertsPage = () => {
  const [outbreaks, setOutbreaks] = useState<Outbreak[]>([]);
  const [loading, setLoading] = useState(false);
  const user = getUserFromToken();

  //edit alert
  const [editAlertId, setEditAlertId] = useState<string | null>();
  const [editDiseaseName, setEditDiseaseName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editLocation, setEditLocation] = useState<string>("");
  const [editStartDate, setEditStartDate] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");

  const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDiseaseName(e.target.value);
  };
  const handleEditDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditDescription(e.target.value);
  };
  const handleEditLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditLocation(e.target.value);
  };
  const handleEditStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditStartDate(e.target.value);
  };
  const handleEditStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditStatus(e.target.value);
  };

  // const isActive = outbreak.status === "ACTIVE";
  useEffect(() => {
    const fetchOutbreaks = async () => {
      setLoading(true);
      try {
        const response = await api.get<OutbreakResponse>(`/outbreaks`);
        setOutbreaks(response.data.outbreaks || []);
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "Failed to fetch outbreaks",
          );
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOutbreaks();
  }, []);

  const toggleEdit = (outbreak: Outbreak) => {
    setEditAlertId(outbreak.id);
    setEditDiseaseName(outbreak.diseaseName);
    setEditDescription(outbreak.description);
    setEditLocation(outbreak.location);
    setEditStartDate(outbreak.startDate.split("T")[0]);
    setEditStatus(outbreak.status);
  };

  const updateOutbreak = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login first.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.put<updatedOutbreakResponse>(
        `/outbreaks/${id}`,
        {
          diseaseName: editDiseaseName,
          description: editDescription,
          location: editLocation,
          startDate: editStartDate,
          status: editStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOutbreaks((prev) =>
        prev.map((o) => (o.id === id ? response.data.updatedOutbreak : o)),
      );

      toast.success("Outbreak alert updated successfully");

      setEditAlertId(null);
      setEditDiseaseName("");
      setEditDescription("");
      setEditLocation("");
      setEditStartDate("");
      setEditStatus("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to update alert");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteOutbreak = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login first");
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/outbreaks/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // setOutbreaks(outbreaks.filter((outbreak) => outbreak.id !== id));
      setOutbreaks((prev) => prev.filter((o) => o.id !== id));
      toast.success("Alert deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to delete alert");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-5 md:py-18">
      <div className="w-[90%] flex flex-col gap-10 md:gap-20 items-center justify-center">
        {user?.role === "VET" && (
          <div className="w-full">
            <AlertsForm />
          </div>
        )}

        <div className="w-full flex flex-col gap-5">
          <h2 className="text-[20px] md:text-[30px] font-bold text-black">
            Recent Alerts{" "}
          </h2>
          {outbreaks.length === 0 ? (
            <div className="flex justify-center items-center h-[50vh] md:h-[80vh]">
              <p className="text-3xl font-bold text-black">
                No alerts posted yet.
              </p>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-[50vh] md:h-[80vh]">
              <HashLoader color="#13ec13" />
            </div>
          ) : (
            outbreaks.map((outbreak) => (
              <div
                key={outbreak.id}
                className="bg-white rounded-xl p-5 border flex flex-col gap-3"
              >
                {editAlertId === outbreak.id ? (
                  <>
                    <input
                      value={editDiseaseName}
                      onChange={handleEditNameChange}
                      name="diseaseName"
                      placeholder="Disease name"
                      className="border p-2 rounded"
                    />

                    <textarea
                      value={editDescription}
                      onChange={handleEditDescriptionChange}
                      name="description"
                      placeholder="Description (optional)"
                      className="border p-2 rounded h-40 resize-none"
                    />

                    <input
                      value={editLocation}
                      onChange={handleEditLocationChange}
                      name="location"
                      placeholder="Location"
                      className="border p-2 rounded"
                    />

                    <input
                      value={editStartDate}
                      onChange={handleEditStartDateChange}
                      type="date"
                      name="startDate"
                      className="border p-2 rounded"
                    />

                    <select
                      value={editStatus}
                      onChange={handleEditStatusChange}
                      name="status"
                      className="border p-2 rounded"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>

                    <button
                      disabled={loading}
                      onClick={() => updateOutbreak(outbreak.id)}
                      className="border p-2 hover:bg-[#1e293b] hover:text-white cursor-pointer font-bold w-full  bg-primary rounded-lg text-black text-[15px] "
                    >
                      {loading ? (
                        <ClipLoader color="white" size={15} />
                      ) : (
                        <> Edit Alert</>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-black">
                        {outbreak.diseaseName}
                      </h3>
                      {outbreak.status === "ACTIVE" ? (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                          RESOLVED
                        </span>
                      )}
                    </div>

                    <div className="flex flex-row gap-5 ">
                      <span className="flex flex-row gap-3 items-center justify-center">
                        <div>
                          <FaLocationDot className="font-bold text-[15px]" />
                        </div>
                        <p className="text-sm text-gray-500">
                          {outbreak.location}
                        </p>
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
                        {user?.role === "VET" && (
                          <>
                            <button
                              onClick={() => toggleEdit(outbreak)}
                              className="border-2 p-2 rounded-lg cursor-pointer font-bold bg-blue-400 hover:bg-blue-200 text-[25px] flex items-center gap-2 border-black"
                            >
                              <CiEdit className="md:hidden" />
                              <span className="hidden md:inline text-[15px]">
                                Edit
                              </span>
                            </button>

                            <button
                              disabled={loading}
                              onClick={() => deleteOutbreak(outbreak.id)}
                              className="border-2 p-2 rounded-lg cursor-pointer font-bold bg-red-400 hover:bg-red-200 text-[25px] flex items-center gap-2 border-black"
                            >
                              <MdOutlineDeleteOutline className="md:hidden" />
                              <span className="hidden md:inline text-[15px]">
                                {loading ? (
                                  <ClipLoader color="white" size={15} />
                                ) : (
                                  <> Delete</>
                                )}
                              </span>
                            </button>
                          </>
                        )}
                      </div>
                      <hr />

                      <span className="text-sm text-gray-500">
                        Reported by Dr. {outbreak.reportedBy.name}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default alertsPage;
