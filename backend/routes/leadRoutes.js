const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");

// ✅ Get all leads
router.get("/", auth, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ✅ Get single lead by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ✅ Add new lead
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, source, notes } = req.body;
    const newLead = new Lead({ name, email, source, notes });
    await newLead.save();
    res.json(newLead);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ✅ Edit lead details
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, email, source } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, source },
      { new: true }
    );
    if (!lead) return res.status(404).json({ msg: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ✅ Delete lead
router.delete("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ msg: "Lead not found" });
    res.json({ msg: "Lead deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ✅ Add note to lead
router.post("/:id/notes", auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: "Lead not found" });

    lead.notes.push(req.body.note);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
