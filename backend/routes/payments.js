const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Subscription = require("../models/Subscription");
const MembershipPlan = require("../models/MembershipPlan");

// ✅ Create a new subscription (simulate M-Pesa payment success)
router.post("/", protect, async (req, res) => {
  try {
    const { planId, phoneNumber, mpesaReceipt } = req.body;

    // Find the plan
    const plan = await MembershipPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Create subscription
    const start = new Date();
    const end = new Date(start.setMonth(start.getMonth() + parseInt(plan.duration)));

    const subscription = new Subscription({
      user: req.user.id,
      plan: plan._id,
      startDate: new Date(),
      endDate: end,
      status: "active",
      mpesaReceipt: mpesaReceipt || "TEST123456", // simulate until M-Pesa API is connected
      amountPaid: plan.price,
      phoneNumber,
    });

    await subscription.save();
    res.json({ message: "Subscription successful", subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get logged-in user’s subscriptions
router.get("/my", protect, async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id }).populate("plan");
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Admin: Get all subscriptions
router.get("/", protect, async (req, res) => {
  try {
    const subs = await Subscription.find().populate("plan user", "-password");
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
