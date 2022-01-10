const { Router } = require("express");
const router = Router();
const { createPayment } = require("./controllers/createPayment");
const { updatePayment } = require("./controllers/updatePayment");
const { getPayments } = require("./controllers/getPayment");

router.post("/", createPayment);
router.put("/:id", updatePayment);
router.get("/", getPayments);

module.exports = router;
