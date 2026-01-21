import SymptomsForm from "../components/SymptomForm";
import SymptomRecommendation from "../components/SymptomRecommendation";

const Symptoms = () => {
  return (
    <div className="bg-background-gray w-full flex flex-col items-center justify-center py-16 md:py-24">
      <div className="w-[90%] flex flex-col md:flex-row gap-10">
        <div className="md:w-[70%] w-full">
          <SymptomsForm />
        </div>
        <div className="md:w-[30%]">
          <SymptomRecommendation />
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
