const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1 Seed Symptoms
  const symptomMap = {};

  const symptomData = [
    { name: "Sneezing", category: "RESPIRATORY" },
    { name: "Eye discharge", category: "RESPIRATORY" },
    { name: "Vomiting", category: "GI" },
    { name: "Diarrhea", category: "GI" },
    { name: "Lethargy", category: "BEHAVIORAL" },
    { name: "Not eating", category: "BEHAVIORAL" },
    { name: "Mouth ulcers", category: "RESPIRATORY" },
    { name: "Drooling", category: "RESPIRATORY" },
    { name: "Blood in stool", category: "GI" },
    { name: "Difficulty breathing", category: "RESPIRATORY" },
    { name: "Straining to urinate", category: "GI" },
    { name: "No urine output", category: "GI" },
    { name: "Seizures", category: "BEHAVIORAL" },
    { name: "Tremors", category: "BEHAVIORAL" },
    { name: "Pale gums", category: "BEHAVIORAL" }
  ];

  for (const symptom of symptomData) {
    const created = await prisma.symptom.upsert({
      where: { name: symptom.name },
      update: {},
      create: symptom
    });

    symptomMap[symptom.name] = created.id;
  }

  // 2 Seed Rules
  const vomitingLethargyRule = await prisma.rule.create({
    data: {
      name: "Repeated vomiting with lethargy",
      description: "Vomiting more than once in 24hrs with lethargy",
      riskLevel: "MEDIUM",
      action: "BOOK_VET",
      minDurationHrs: 24
    }
  });

  const breathingRule = await prisma.rule.create({
    data: {
      name: "Difficulty breathing",
      description: "Any breathing difficulty or rapid breathing",
      riskLevel: "CRITICAL",
      action: "EMERGENCY",
      isOverride: true
    }
  });

  // 3 Link Rules to Symptoms
  await prisma.ruleSymptom.createMany({
    data: [
      {
        ruleId: vomitingLethargyRule.id,
        symptomId: symptomMap["Vomiting"]
      },
      {
        ruleId: vomitingLethargyRule.id,
        symptomId: symptomMap["Lethargy"]
      },
      {
        ruleId: breathingRule.id,
        symptomId: symptomMap["Difficulty breathing"]
      }
    ]
  });

  console.log("Seeding completed.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
