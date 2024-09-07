const prisma = require("../prisma");

exports.sendNotification = async (userId, message) => {
  try {
    await prisma.notification.create({
      data: { userId, message },
    });
  } catch (error) {
    console.error("Failed to send notification", error);
  }
};
