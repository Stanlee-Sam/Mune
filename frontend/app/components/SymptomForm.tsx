
import { SymptomPayload } from "@/types/types";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const SYMPTOMS = [
  "Vomiting",
  "Diarrhea",
  "Lethargy",
  "Not eating",
  "Sneezing",
  "Eye discharge",
  "Difficulty breathing",
  "Coughing",
  "Straining to urinate",
];

type SymptomsFormProps = {
  onEvaluate: (payload: SymptomPayload) => void;
  loading: boolean;
};

const SymptomsForm = ({onEvaluate, loading }: SymptomsFormProps) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [petAgeMonths, setPetAgeMonths] = useState<number | "">("");
  const [durationHrs, setDurationHrs] = useState<number | "">("");
  const [location, setLocation] = useState("");

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   

    if (symptoms.length === 0 || petAgeMonths === "" || durationHrs === "") {
       toast.error("Please fill in all required fields.");
      return;
    }

    onEvaluate({
      symptoms,
      petAgeMonths,
      durationHrs,
      location,
    });
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <h1 className="text-[25px] font-bold text-black mb-6">
        Check Your Pet’s Symptoms
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Symptoms */}
        <div>
          <label className="mb-2 block text-black font-bold">
            Symptoms (select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {SYMPTOMS.map((symptom) => (
              <label
                key={symptom}
                className="flex items-center space-x-2 border rounded-md p-2 text-black"
              >
                <input
                  className="border bg-primary rounded-lg p-2 cursor-pointer focus:ring-blue-500"
                  type="checkbox"
                  checked={symptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                />
                <span>{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pet Age */}
        <div className="flex flex-col gap-3">
          <label className="text-black font-bold">Pet age (months)</label>
          <input
            className="border rounded-lg p-2 "
            type="number"
            placeholder="e.g. 4"
            value={petAgeMonths}
            onChange={(e) => setPetAgeMonths(Number(e.target.value))}
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-3">
          <label className="text-black font-bold">
            How long have the symptoms lasted? (hours)
          </label>
          <input
            className="border rounded-lg p-2 "
            type="number"
            placeholder="e.g. 24"
            value={durationHrs}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDurationHrs(Number(e.target.value))
            }
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-3">
          <label className="text-black font-bold">Location (optional)</label>
          <input
            className="border rounded-lg p-2 "
            placeholder="e.g. Nairobi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Used only to check if there’s an outbreak near you.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground">
          This tool provides guidance only and does not replace a veterinary
          diagnosis.
        </p>

        <button
          className="border p-2 hover:bg-[#1e293b] hover:text-white cursor-pointer font-bold w-full  bg-primary rounded-lg text-black text-[15px] "
          type="submit"
          disabled={loading}
        >
          {loading ?<ClipLoader color="white" size={15} /> : "Analyze Symptoms"}
        </button>
      </form>
    </div>
  );
};

export default SymptomsForm;
