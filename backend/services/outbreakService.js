const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const isOutbreakActive = async (location) => {
    if(!location) return false;

    const outbreak = await prisma.outbreakReport.findFirst({
        where : {
            location: {
                contains: location,
                mode: 'insensitive'
            },
            status : 'ACTIVE'
        }
    })
    return Boolean(outbreak);
}

module.exports = { isOutbreakActive };    