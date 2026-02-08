"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCirclePlus, FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import api from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";
import { ClipLoader, HashLoader } from "react-spinners";
import { getUserFromToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

interface Clinic {
  id: string;
  name: string;
  location: string;
  phone: string;
  emergencyAvailable: boolean;
  imageUrl: string;
}

interface clinicResponse {
  clinics: Clinic[];
}

interface updateClinicResponse {
  updatedClinic: Clinic;
}

const Vets = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [emergencyAvailable, setEmergencyAvailable] = useState<boolean>(false);
  // Edit
  const [editClinicId, setEditClinicId] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [editLocation, setEditLocation] = useState<string>("");
  const [editPhone, setEditPhone] = useState<string>("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [editEmergencyAvailable, setEditEmergencyAvailable] =
    useState<boolean>(false);
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const router = useRouter();

  const [user, setUser] = useState<{ role?: string } | null>(null);

  useEffect(() => {
    const u = getUserFromToken();
    setUser(u);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleEmergencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmergencyAvailable(e.target.checked);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //edit
  const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };
  const handleEditLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditLocation(e.target.value);
  };
  const handleEditPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPhone(e.target.value);
  };
  const handleEditEmergencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditEmergencyAvailable(e.target.checked);
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditImage(file);

      // Preview
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      try {
        const res = await api.get<clinicResponse>(`/clinic`);
        setClinics(res.data.clinics);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "Failed to fetch clinics",
          );
        } else {
          toast.error("Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  const toggleAdd = () => {
    setOpenAdd(!openAdd);
  };

  const AddClinic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login first.");
      router.push("/login");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("phone", phone);
    formData.append("emergencyAvailable", String(emergencyAvailable));
    if (image) {
      formData.append("image", image);
    }
    try {
      const res = await api.post(`/clinic`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Clinic added successfully");
      setClinics((prev) => [...prev, res.data.newClinic]);
      setOpenAdd(false);
      setName("");
      setLocation("");
      setPhone("");
      setEmergencyAvailable(false);
      setImage(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to add clinic");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateClinic = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login first");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("location", editLocation);
      formData.append("phone", editPhone);
      formData.append("emergencyAvailable", String(editEmergencyAvailable));

      // Only append if a new file is selected
      if (editImage) {
        formData.append("image", editImage);
      }
      const response = await api.put<updateClinicResponse>(
        `/clinic/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setClinics((prev) =>
        prev.map((c) => (c.id === id ? response.data.updatedClinic : c)),
      );
      toast.success("Clinic updated successfully");
      cancelEdit();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to update clinic");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteClinic = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login first");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      await api.delete(`/clinic/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClinics((prev) => prev.filter((c) => c.id !== id));
      toast.success("Clinic deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to delete clinic");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = (clinic: Clinic) => {
    setEditClinicId(clinic.id);
    setEditName(clinic.name);
    setEditLocation(clinic.location);
    setEditPhone(clinic.phone);
    setEditEmergencyAvailable(clinic.emergencyAvailable);
    setEditImage(null);
    setEditImagePreview(clinic.imageUrl);
  };

  const cancelEdit = () => {
    setEditClinicId("");
    setEditName("");
    setEditLocation("");
    setEditPhone("");
    setEditEmergencyAvailable(false);
    setEditImage(null);
    setEditImagePreview("");
  };

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = clinic.location
      .toLowerCase()
      .includes(locationTerm.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-16 md:py-24">
      <div className="w-[90%] flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col md:flex-row w-full items-start md:justify-between gap-3">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="flex flex-col  gap-2 items-start justify-center w-[70%]"
            >
              <h3 className="md:text-[30px] text-[20px] text-left font-bold text-black">
                Find Trusted Veterinary Care
              </h3>
              <p className="text-gray-500 font-semibold text-[15px] md:text-[18px] text-left">
                Connect with verified clinics and emergency services across
                Kenya. Your pet's health is our priority.
              </p>
            </motion.div>
            {user?.role === "VET" && (
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                onClick={toggleAdd}
                className="flex flex-row gap-2 border bg-primary hover:bg-[#1e293b] hover:text-white cursor-pointer items-center justify-center py-2 px-2 md:py-2 md:px-6 rounded-lg text-black"
              >
                <span>
                  <FaCirclePlus />
                </span>
                <p className="font-bold "> Add Clinic</p>
              </motion.button>
            )}
          </div>
          {openAdd && (
            <form
              onSubmit={AddClinic}
              className="bg-white w-full rounded-xl p-6 flex flex-col gap-4"
            >
              <h3 className="text-xl font-bold text-black">Add Clinic</h3>

              {/* Clinic name */}
              <input
                value={name}
                onChange={handleNameChange}
                name="name"
                type="text"
                placeholder="Clinic name"
                required
                className="border p-3 rounded-lg w-full"
              />

              {/* Location */}
              <input
                value={location}
                onChange={handleLocationChange}
                name="location"
                type="text"
                placeholder="Location"
                required
                className="border p-3 rounded-lg w-full"
              />

              {/* Phone */}
              <input
                value={phone}
                onChange={handlePhoneChange}
                name="phone"
                type="text"
                placeholder="Phone number"
                required
                className="border p-3 rounded-lg w-full"
              />

              {/* Emergency */}
              <label className="flex items-center gap-2">
                <input
                  checked={emergencyAvailable}
                  onChange={handleEmergencyChange}
                  type="checkbox"
                  name="emergencyAvailable"
                  value="true"
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">
                  24/7 Emergency Available
                </span>
              </label>

              {/* Image upload */}
              <input
                accept="image/*"
                onChange={handleImageChange}
                type="file"
                name="image"
                className="border p-2 rounded-lg w-full text-black cursor-pointer"
              />

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-black font-bold px-4 py-2 rounded-lg"
                >
                  {loading ? (
                    <ClipLoader color="white" size={15} />
                  ) : (
                    "Save Clinic"
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  type="button"
                  onClick={() => setOpenAdd(false)}
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          )}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="bg-white rounded-lg p-2 flex flex-row justify-between items-center w-full"
          >
            <div className="flex flex-col md:flex-row justify-between items-left gap-2 w-[80%]">
              <div className="w-full relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  value={locationTerm}
                  onChange={(e) => setLocationTerm(e.target.value)}
                  placeholder="Nairobi, Mombasa or near me.."
                  className="border p-2 rounded-lg bg-gray-100 w-full text-[15px] md:text-[18px] pl-7"
                />
                <span className="absolute top-3.5 left-1 text-gray-500">
                  <FaLocationDot />
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="bg-[#1e293b] text-white border p-2 rounded-lg font-semibold cursor-pointer w-20 md:w-50 h-12  text-[12px] md:text-[18px]"
            >
              Find a vet
            </motion.button>
          </motion.div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <div className="flex flex-col items-start w-full">
            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="text-[20px] md:text-[30px] font-bold text-black text-left"
            >
              Featured Clinics
            </motion.h2>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-[50vh] md:h-[80vh]">
              <HashLoader color="#13ec13" />
            </div>
          ) : clinics.length === 0 ? (
            <div className="flex justify-center items-center h-[50vh] md:h-[80vh]">
              <p className="text-3xl font-bold text-black">No clinics found</p>
            </div>
          ) : filteredClinics.length === 0 ? (
            <div className="flex justify-center items-center h-[50vh] md:h-[80vh]">
              <p className="text-3xl font-bold text-black">
                No clinics match your search
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-5 w-full"
            >
              {filteredClinics.map((clinic) => (
                <motion.div
                  variants={item}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  key={clinic.id}
                  className="bg-white rounded-xl w-full"
                >
                  {editClinicId === clinic.id ? (
                    <div className="bg-white w-full rounded-xl p-6 flex flex-col gap-4">
                      <input
                        value={editName}
                        onChange={handleEditNameChange}
                        name="name"
                        type="text"
                        placeholder="Clinic name"
                        required
                        className="border p-3 rounded-lg w-full"
                      />

                      {/* Location */}
                      <input
                        value={editLocation}
                        onChange={handleEditLocationChange}
                        name="location"
                        type="text"
                        placeholder="Location"
                        required
                        className="border p-3 rounded-lg w-full"
                      />

                      {/* Phone */}
                      <input
                        value={editPhone}
                        onChange={handleEditPhoneChange}
                        name="phone"
                        type="text"
                        placeholder="Phone number"
                        required
                        className="border p-3 rounded-lg w-full"
                      />

                      {/* Emergency */}
                      <label className="flex items-center gap-2">
                        <input
                          checked={editEmergencyAvailable}
                          onChange={handleEditEmergencyChange}
                          type="checkbox"
                          name="emergencyAvailable"
                          value="true"
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">
                          24/7 Emergency Available
                        </span>
                      </label>

                      {editImagePreview && (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden">
                          <Image
                            src={editImagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Image upload */}
                      <input
                        accept="image/*"
                        onChange={handleEditImageChange}
                        type="file"
                        name="image"
                        className="border p-2 rounded-lg w-full text-black cursor-pointer"
                      />

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                          disabled={loading}
                          onClick={() => updateClinic(clinic.id)}
                          className="bg-primary text-black font-bold px-4 py-2 rounded-lg"
                        >
                          {loading ? (
                            <ClipLoader color="white" size={15} />
                          ) : (
                            "Save Clinic"
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                          type="button"
                          onClick={() => cancelEdit()}
                          className="border px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative w-full h-60 md:h-72 rounded-t-xl overflow-hidden">
                        <Image
                          src={clinic.imageUrl || "/assets/vet.png"}
                          alt={clinic.name}
                          fill
                          className="object-cover"
                        />
                        {user?.role === "VET" && (
                          <div className="flex flex-row gap-1 absolute top-2 right-2 z-10">
                            <motion.button
                              whileHover={{ scale: 1.03, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                              }}
                              onClick={() => toggleEdit(clinic)}
                              className="p-2 bg-white rounded-full cursor-pointer hover:bg-black text-black hover:text-white"
                            >
                              <IoPencil />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                              }}
                              disabled={loading}
                              onClick={() => deleteClinic(clinic.id)}
                              className="p-2 bg-white rounded-full cursor-pointer hover:bg-black text-black hover:text-white"
                            >
                              <RiDeleteBin6Line />
                            </motion.button>
                          </div>
                        )}

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
                        <motion.button
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                          className="bg-primary text-white border p-2 rounded-lg font-bold cursor-pointer w-full text-[15px] md:text-[18px]"
                        >
                          Get Directions
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vets;
