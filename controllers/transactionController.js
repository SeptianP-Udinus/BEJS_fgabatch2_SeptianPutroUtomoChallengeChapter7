const prisma = require("../prisma");

exports.deposit = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount } = req.body;

    const account = await prisma.account.findFirst({ where: { userId } });

    await prisma.transaction.create({
      data: {
        type: "deposit",
        amount,
        accountId: account.id,
      },
    });

    await prisma.account.update({
      where: { id: account.id },
      data: { balance: { increment: amount } },
    });

    res.status(200).json({ message: "Deposit successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount } = req.body;

    const account = await prisma.account.findFirst({ where: { userId } });

    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    await prisma.transaction.create({
      data: {
        type: "withdraw",
        amount,
        accountId: account.id,
      },
    });

    await prisma.account.update({
      where: { id: account.id },
      data: { balance: { decrement: amount } },
    });

    res.status(200).json({ message: "Withdraw successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
