export type SymptomPayload = {
  symptoms: string[];
  petAgeMonths: number;
  durationHrs: number;
  location?: string;
};

export type ApiEvaluationResult = {
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  action: "HOME_CARE" | "BOOK_VET" | "EMERGENCY";
  explanation: string;
  outbreakActive: boolean;
};
