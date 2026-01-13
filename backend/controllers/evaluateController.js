const { evaluateRules } = require("../services/ruleEvaluator");
const { isOutbreakActive } = require("../services/outbreakService");

const Evaluate = async (req, res) => {
  try {
    const { symptoms, petAgeMonths, durationHrs, location } = req.body;

    if (!Array.isArray(symptoms) || !symptoms.length) {
      return res.status(400).json({ error: "Provide at least one symptom" });
    }

    //  Backend decides outbreak context
    const userLocation = location || req.user.location || null;
    const outbreakActive = await isOutbreakActive(userLocation);

    const result = await evaluateRules({
      symptomNames: symptoms,
      petAgeMonths,
      durationHrs,
      outbreakActive,
    });

    res.json({
      ...result,
      outbreakActive,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to evaluate symptoms",
    });
  }
};

module.exports = { Evaluate };
