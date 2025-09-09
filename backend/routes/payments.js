const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Subscription = require("../models/Subscription");
const MembershipPlan = require("../models/MembershipPlan");

// Create a new payment (subscribe to a plan)
router.post("/", auth, async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await MembershipPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const subscription = new Subscription({
      user: req.user.id,
      plan: plan._id,
      startDate: new Date(),
      endDate: new Date(
        new Date().setMonth(new Date().getMonth() + parseInt(plan.duration))
      ), // crude duration handling
      status: "active",
    });

    await subscription.save();
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get user subscriptions
router.get("/my", auth, async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id }).populate("plan");
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
