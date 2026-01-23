require('dotenv').config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postOutbreak = async (req, res) => {
  try {
    const {
      diseaseName,
      description,
      location,
      startDate,
      status,
      reportedBy,
    } = req.body;
    if (!diseaseName || !location || !startDate || !status || !reportedBy) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!["ACTIVE", "RESOLVED"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be ACTIVE or RESOLVED" });
    }

    const outbreakReport = await prisma.outbreakReport.create({
      data: {
        diseaseName,
        description,
        location,
        startDate: new Date(startDate),
        status,
        reportedBy: { connect: { id: reportedBy } },
      },
    });
    res.json({ outbreakReport });
  } catch (error) {
    console.error("Error creating outbreak report:", error);
    res.status(500).json({ message: "Failed to create outbreak report" });
  }
};

const fetchOutbreaks = async (req, res) => {
  try {
    const outbreaks = await prisma.outbreakReport.findMany();
    res.json({ outbreaks });
  } catch (error) {
    console.error("Error fetching outbreaks:", error);
    res.status(500).json({ message: "Failed to fetch outbreaks" });
  }
};

const updateOutbreak = async (req, res) => {
  try {
    const outbreakId = req.params.id;
    const {
      diseaseName,
      description,
      location,
      startDate,
      status,
      reportedBy,
    } = req.body;

    const existingOutbreak = await prisma.outbreakReport.findUnique({
      where: { id: outbreakId },
    });

    if (!existingOutbreak) {
      return res.status(404).json({ message: "Outbreak report not found" });
    }

    if (!diseaseName || !location || !startDate || !status || !reportedBy) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const updatedOutbreak = await prisma.outbreakReport.update({
      where: { id: outbreakId },
      data: {
        diseaseName,
        description,
        location,
        startDate: new Date(startDate),
        status,
        reportedBy: { connect: { id: reportedBy } },
      },
    });
    res.json({ updatedOutbreak });
  } catch (error) {
    console.error("Error updating outbreak report:", error);
    res.status(500).json({ message: "Failed to update outbreak report" });
  }
};

const deleteOutbreak = async (req, res) => {
  try {
    const outbreakId = req.params.id;
    const existingOutbreak = await prisma.outbreakReport.findUnique({
      where: { id: outbreakId },
    });

    if (!existingOutbreak) {
      return res.status(404).json({ message: "Outbreak report not found" });
    }
    await prisma.outbreakReport.delete({
      where: { id: outbreakId },
    });
    res.json({ message: "Outbreak report deleted successfully" });
  } catch (error) {
    console.error("Error deleting outbreak report:", error);
    res.status(500).json({ message: "Failed to delete outbreak report" });
  }
};

const fetchSpecificOutbreak = async (req, res) => {
  try {
    const outbreakId = req.params.id;
    const outbreak = await prisma.outbreakReport.findUnique({
      where: { id: outbreakId },
    });
    if (!outbreak) {
      return res.status(404).json({ message: "Outbreak not found" });
    }
    res.json({
      outbreak
    })
  } catch (error) {
    console.error("Error fetching outbreak:", error);
    res.status(500).json({ message: "Failed to fetch outbreak" });
  }
}

module.exports = {
  postOutbreak,
  fetchOutbreaks,
  updateOutbreak,
  deleteOutbreak,
  fetchSpecificOutbreak
};
