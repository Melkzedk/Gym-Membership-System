const express = require('express');
const router = express.Router();
const Plan = require('../models/MembershipPlan');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

router.post('/', protect, admin, async (req, res) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
});

module.exports = router;
