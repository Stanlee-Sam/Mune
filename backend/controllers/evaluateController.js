const { evaluateRules } = require('../services/ruleEvaluator');
const { isOutbreakActive } = require('../services/outbreakService');

const Evaluate = async (req, res) => {
  try {
    const {
      symptoms,
      petAgeMonths,
      durationHrs,
      location
    } = req.body;

    //  Backend decides outbreak context
    const outbreakActive = await isOutbreakActive(location);

    const result = await evaluateRules({
      symptomNames: symptoms,
      petAgeMonths,
      durationHrs,
      outbreakActive
    });

    res.json({
      ...result,
      outbreakActive
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to evaluate symptoms"
    });
  }
}

module.exports = { Evaluate };