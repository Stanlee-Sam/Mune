require('dotenv').config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addClinic = async (req, res) => {
    try {
        const {name, location, phone, emergencyAvailable} = req.body;
    if(!name || !location || !phone || emergencyAvailable === undefined){
        return res.status(400).json({ message: "All fields are required" });
    }
        const newClinic = await prisma.vetClinic.create({
            data: {
                name,
                location,
                phone,
                emergencyAvailable,
            },
        });
        res.json({ newClinic });
        
    } catch (error) {
        console.error("Error adding clinic:", error);
        res.status(500).json({ message: "Failed to add clinic" });
    }
};

const getClinics = async (req, res) => {
    try {
        const clinics = await prisma.vetClinic.findMany();
        res.json({ clinics });
    } catch (error) {
        console.error("Error fetching clinics:", error);
        res.status(500).json({ message: "Failed to fetch clinics" });
    }
};

const updateClinic = async(req, res) => {
    try {
        const clinicId = req.params.id;
        const {name, location, phone, emergencyAvailable} = req.body;
        if(!name || !location || !phone || emergencyAvailable === undefined){
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingClinic = await prisma.vetClinic.findUnique({
            where: { id: clinicId },
        })
        if(!existingClinic){
            return res.status(404).json({ message: "Clinic not found" });
        }
        const updatedClinic = await prisma.vetClinic.update({
            where: { id: clinicId },
            data: {
                name,
                location,
                phone,
                emergencyAvailable,
            },
        });
        res.json({ updatedClinic });
    } catch (error) {
        console.error("Error updating clinic:", error);
        res.status(500).json({ message: "Failed to update clinic" });
    }
}

const deleteClinic = async(req, res) => {
    try {
        const clinicId = req.params.id;
        const existingClinic = await prisma.vetClinic.findUnique({
            where: { id: clinicId },
        })
        if(!existingClinic){
            return res.status(404).json({ message: "Clinic not found" });
        }
        await prisma.vetClinic.delete({
            where: { id: clinicId },
        });
        res.json({ message: "Clinic deleted successfully" });
    } catch (error) {
        console.error("Error deleting clinic:", error);
        res.status(500).json({ message: "Failed to delete clinic" });
    }
}

module.exports = {
    addClinic,
    getClinics,
    updateClinic,
    deleteClinic
}