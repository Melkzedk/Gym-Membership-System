const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const User = require("../models/User");

// ✅ Get all members (admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const members = await User.find().select("-password");
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get a single member by ID (protected)
router.get("/:id", protect, async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select("-password");
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delete a member (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
