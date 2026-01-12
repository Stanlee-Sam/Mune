const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const RISK_PRIORITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4
};

async function evaluateRules({
  symptomNames,
  petAgeMonths,
  durationHrs,
  outbreakActive
}) {
  // 1️⃣ Fetch symptom IDs
  const symptoms = await prisma.symptom.findMany({
    where: {
      name: { in: symptomNames }
    }
  });

  const symptomIds = symptoms.map(s => s.id);

  // 2️⃣ Fetch candidate rules
  const rules = await prisma.rule.findMany({
    include: {
      symptoms: true
    }
  });

  const matchedRules = [];

  for (const rule of rules) {
    const ruleSymptomIds = rule.symptoms.map(rs => rs.symptomId);

    // All required symptoms must be present
    const hasAllSymptoms = ruleSymptomIds.every(id =>
      symptomIds.includes(id)
    );

    if (!hasAllSymptoms) continue;

    // Duration check
    if (
      rule.minDurationHrs &&
      (!durationHrs || durationHrs < rule.minDurationHrs)
    ) {
      continue;
    }

    // Age check (kitten rules)
    if (
      rule.ageLimitMonths &&
      (!petAgeMonths || petAgeMonths > rule.ageLimitMonths)
    ) {
      continue;
    }

    // Outbreak check
    if (
      rule.outbreakActive === true &&
      outbreakActive !== true
    ) {
      continue;
    }

    matchedRules.push(rule);
  }

  // 3️⃣ No rule matched
  if (matchedRules.length === 0) {
    return {
      riskLevel: "LOW",
      action: "MONITOR",
      explanation: "No high-risk symptom patterns detected. Monitor at home."
    };
  }

  // 4️⃣ Pick highest priority rule
  let finalRule = matchedRules[0];

  for (const rule of matchedRules) {
    // Override always wins
    if (rule.isOverride) {
      finalRule = rule;
      break;
    }

    if (
      RISK_PRIORITY[rule.riskLevel] >
      RISK_PRIORITY[finalRule.riskLevel]
    ) {
      finalRule = rule;
    }
  }

  return {
    riskLevel: finalRule.riskLevel,
    action: finalRule.action,
    explanation:
      finalRule.description ||
      "Symptoms match a known risk pattern. Follow recommended action."
  };
}

module.exports = { evaluateRules };
