const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  source: { type: String, default: "Unknown source" }, 
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Earnings", earningsSchema);
