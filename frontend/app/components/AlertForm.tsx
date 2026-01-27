"use client";

import api from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
// import { OutbreakStatus } from "@/types/outbreak";

const AlertForm = () => {
  const [form, setForm] = useState({
    diseaseName: "",
    description: "",
    location: "",
    startDate: "",
    status: "ACTIVE",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        `/outbreaks`,
        {
          ...form,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Outbreak alert posted successfully");
      setForm({
        diseaseName: "",
        description: "",
        location: "",
        startDate: "",
        status: "ACTIVE",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to post alert");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl flex flex-col gap-4 w-full"
    >
      <h2 className="text-[20px] md:text-[30px] font-bold text-black">
        Post New Alert
      </h2>

      <input
        required
        name="diseaseName"
        placeholder="Disease name"
        className="border p-2 rounded"
        value={form.diseaseName}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        className="border p-2 rounded h-40 resize-none"
        value={form.description}
        onChange={handleChange}
      />

      <input
        required
        name="location"
        placeholder="Location"
        className="border p-2 rounded"
        value={form.location}
        onChange={handleChange}
      />

      <input
        required
        type="date"
        name="startDate"
        className="border p-2 rounded"
        value={form.startDate}
        onChange={handleChange}
      />

      <select
        required
        name="status"
        className="border p-2 rounded"
        value={form.status}
        onChange={handleChange}
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>

      <button
        disabled={loading}
        className="border p-2 hover:bg-[#1e293b] hover:text-white cursor-pointer font-bold w-full  bg-primary rounded-lg text-black text-[15px] "
      >
        {loading ? <ClipLoader color="white" size={15} /> : <> Post Alert</>}
      </button>
    </form>
  );
};

export default AlertForm;
