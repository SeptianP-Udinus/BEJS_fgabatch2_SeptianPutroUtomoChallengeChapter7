const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.post("/deposit", transactionController.deposit);
router.post("/withdraw", transactionController.withdraw);

module.exports = router;
