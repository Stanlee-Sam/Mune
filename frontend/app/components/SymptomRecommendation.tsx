import { IoIosWarning } from "react-icons/io";
import { GiHospitalCross } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { ApiEvaluationResult } from "@/types/types";
import { ACTION_UI, RISK_UI } from "@/lib/constants";

type Props = {
  result?: ApiEvaluationResult | null;
};

const SymptomRecommendation = ({ result }: Props) => {
  const riskUI = result ? RISK_UI[result.riskLevel] : null;
  const actionUI = result ? ACTION_UI[result.action] : null;
 const RiskIcon = riskUI?.icon || (() => <span>?</span>);
   return (
   <div className="flex flex-col gap-7 w-full">
      {/* Recommendation Card */}
      <div className="bg-white px-8 py-10 rounded-xl flex flex-col gap-4 min-h-[200px]">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] text-black font-bold">Recommendation</h3>
          <span className={`text-2xl ${riskUI?.badge || "text-gray-300"}`}>
            <RiskIcon />
          </span>
        </div>

        <hr />

        <div
          className={`${riskUI?.bg || "bg-gray-50"} flex gap-3 rounded-xl p-4 min-h-[100px]`}
        >
          <span className={`text-2xl ${riskUI?.badge || "text-gray-300"}`}>
            <RiskIcon />
          </span>

          <div className="flex flex-col gap-2">
            <span className={`font-bold text-[18px] ${riskUI?.text || "text-gray-400"}`}>
              {riskUI ? riskUI.label : "No data yet"}
            </span>
            <p className={`${riskUI?.text || "text-gray-400"} text-[16px]`}>
              {result?.explanation || "Please fill the form to see recommendations."}
            </p>
          </div>
        </div>
      </div>

      {/* Actions Card */}
      <div className="bg-white px-8 py-10 rounded-xl min-h-[150px]">
        <h3 className="text-[18px] text-black font-bold mb-4">What You Should Do</h3>
        <ul className="flex flex-col gap-6">
          {actionUI?.actions.length ? (
            actionUI.actions.map((action, index) => (
              <li key={index} className="flex gap-3 items-center">
                <span className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <span className="text-black">{action}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No actions to display yet</li>
          )}
        </ul>
      </div>

      {/* Outbreak warning */}
      {result?.outbreakActive && (
        <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-800 font-semibold">
          ⚠️ There is an active outbreak in your area. Extra caution advised.
        </div>
      )}
    </div>
  );
};

export default SymptomRecommendation;
