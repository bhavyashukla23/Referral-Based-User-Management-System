const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  earnings: {
      direct: { type: Number, default: 0 },
      indirect: { type: Number, default: 0 },
      source: { type: String }
  }
});



module.exports = mongoose.model("User", userSchema);
