const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipPlan", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
  mpesaReceipt: { type: String }, // store M-Pesa receipt number
  amountPaid: { type: Number },
  phoneNumber: { type: String },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
