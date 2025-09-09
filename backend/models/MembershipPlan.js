const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: String,
  price: Number, // in cents or currency units
  durationDays: Number,
  features: [String]
});

module.exports = mongoose.model('MembershipPlan', PlanSchema);
