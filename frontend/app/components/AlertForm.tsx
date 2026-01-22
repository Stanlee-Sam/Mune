"use client";

import { useState } from "react";
// import { OutbreakStatus } from "@/types/outbreak";

const AlertForm = () => {
  const [form, setForm] = useState({
    diseaseName: "",
    description: "",
    location: "",
    startDate: "",
    status: "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // MOCK submit for now
    console.log({
      ...form,
      reportedBy: "vet-user-id", // backend expects this
    });
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
        name="location"
        placeholder="Location"
        className="border p-2 rounded"
        value={form.location}
        onChange={handleChange}
      />

      <input
        type="date"
        name="startDate"
        className="border p-2 rounded"
        value={form.startDate}
        onChange={handleChange}
      />

      <select
        name="status"
        className="border p-2 rounded"
        value={form.status}
        onChange={handleChange}
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>

      <button className="border p-2 hover:bg-[#1e293b] hover:text-white cursor-pointer font-bold w-full  bg-primary rounded-lg text-black text-[15px] ">
        Post Alert
      </button>
    </form>
  );
};

export default AlertForm;
