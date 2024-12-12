const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source: { type: String, required: false },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Earnings = mongoose.models.Earnings || mongoose.model("Earnings", earningsSchema);

module.exports = Earnings;

