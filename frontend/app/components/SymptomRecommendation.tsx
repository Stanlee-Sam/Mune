import { IoIosWarning } from "react-icons/io";
import { GiHospitalCross } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";

const SymptomRecommendation = () => {
  const observations = [
    "Potential dehydration detected",
    "Loss of appetite is concerning",
    "Lethergy requires evaluation",
  ];

  const immediateActions = [
    {
      id: 1,
      action: "Ensure fresh water is available",
    },
    {
      id: 2,
      action: "Keep cat in a quiet, comfortable space",
    },
    {
      id: 3,
      action: "Contact your nearest emergency vet clinic",
    },
  ];
  return (
    <div className="flex flex-col gap-7">
      <div className="recommendation bg-white px-8 py-10 rounded-xl flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center w-full p-2">
          <h3 className="text-[18px] text-black font-bold">Recommendation</h3>
          <span className="text-[#f59e0b] text-2xl">
            <IoIosWarning />
          </span>
        </div>
        <hr />
        <div className="bg-[#fffbeb] flex flex-row gap-2 rounded-xl p-4">
          <span className="text-2xl text-[#d97706]">
            <GiHospitalCross />
          </span>
          <div className="flex flex-col gap-2 ">
            <span className="text-[#92400e] font-bold text-[18px]">
              URGENT ATTENTION NEEDED
            </span>
            <h3 className="text-[#78350f] font-extrabold text-[20px]">
              Take to the vet as soon as possible
            </h3>
            <p className="text-[#92400e] text-[18px]">
              Based on the symptoms prescribed. Immediate veterinary attention
              is recommended.
            </p>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-7">
            {observations.map((observation) => (
              <li className="flex flex-row gap-2 text-black">
                <span className="text-white text-[15px] font-extrabold bg-primary p-1 rounded-full">
                  <TiTick />
                </span>
                {observation}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="immediate-actions bg-white px-8 py-10 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col gap-7">
          <div className="flex flex-row  items-center w-full p-2">
            <h3 className="text-[18px] text-black font-bold">
              Immediate Actions{" "}
            </h3>
          </div>
          <hr />
          <ul className="flex flex-col gap-7 items-start">
            {immediateActions.map((immediateAction) => (
              <div className="flex flex-row gap-3 items-center">
                <span className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center text-sm font-semibold">
                  {immediateAction.id}
                </span>

                <li className="text-black" key={immediateAction.id}>
                  {immediateAction.action}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="vets bg-[#f1f5f9] px-8 py-10 rounded-xl flex flex-col gap-4 items-start">
        <h3 className="text-[18px] text-black font-bold">
          Find Emergency Vets
        </h3>
        <div className="flex flex-row justify-center gap-3 p-2 items-center w-full bg-white rounded-lg">
          <span>
            <FaLocationDot />
          </span>
          <p className="font-bold text-black">View Nearby Clinics</p>
        </div>
      </div>
    </div>
  );
};

export default SymptomRecommendation;
