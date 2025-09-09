const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Get all members (admin only for now)
router.get("/", auth, async (req, res) => {
  try {
    const members = await User.find().select("-password");
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a single member by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select("-password");
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a member
router.delete("/:id", auth, async (req, res) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
