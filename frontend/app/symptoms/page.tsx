"use client";
import { useState } from "react";
import SymptomsForm from "../components/SymptomForm";
import SymptomRecommendation from "../components/SymptomRecommendation";
import api from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";
import { ApiEvaluationResult, SymptomPayload } from "@/types/types";

const Symptoms = () => {
  const [result, setResult] = useState<ApiEvaluationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const evaluateSymptoms = async (payload: SymptomPayload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login first");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post<ApiEvaluationResult>(
        "/evaluate",
        payload,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      setResult(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to evaluate symptoms",
        );
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-16 md:py-24">
      <div className="w-[90%] flex flex-col md:flex-row gap-10">
        <div
          className={`w-full md:${result ? "w-7/12" : "w-full"} transition-all`}
        >
          <SymptomsForm onEvaluate={evaluateSymptoms} loading={loading} />
        </div>

        {result && (
          <div className="w-full md:w-5/12">
            <SymptomRecommendation result={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Symptoms;
