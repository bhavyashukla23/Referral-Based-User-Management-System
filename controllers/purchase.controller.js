const User = require("../models/users.model");
const Purchase = require("../models/purchase.model");
const Earnings = require("../models/earnings.model");

const createPurchase = async (req, res) => {
  const { userId, amount, items } = req.body;

  // Validate purchase amount
  if (!userId || amount < 1000) {
    return res.status(400).json({
      message: "Invalid purchase. User ID is required and amount must exceed 1000.",
    });
  }

  try {
    // Create purchase entry
    const purchase = await Purchase.create({ userId, amount, items });

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Handle referral earnings
    await handleReferralEarnings(user, amount);

    res.status(201).json({
      message: "Purchase recorded successfully.",
      purchase,
    });
  } catch (error) {
    console.error("Error in createPurchase:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const handleReferralEarnings = async (user, amount) => {
  try {
    // Direct earnings (Level 1)
    const directReferrer = user.referrals[0];
    if (directReferrer) {
      const directEarnings = amount * 0.05;
      await Earnings.create({
        userId: directReferrer,
        source: "direct referral",
        amount: directEarnings,
      });
      await User.findByIdAndUpdate(directReferrer, { $inc: { earnings: directEarnings } });
    }

    // Indirect earnings (Level 2)
    const indirectReferrer = user.referrals[1];
    if (indirectReferrer) {
      const indirectEarnings = amount * 0.01;
      await Earnings.create({
        userId: indirectReferrer,
        source: "indirect referral",
        amount: indirectEarnings,
      });
      await User.findByIdAndUpdate(indirectReferrer, { $inc: { earnings: indirectEarnings } });
    }
  } catch (error) {
    console.error("Error in handleReferralEarnings:", error);
    throw error;
  }
};

const getUserPurchases = async (req, res) => {
  const { userId } = req.params;

  try {
    const purchases = await Purchase.find({ userId });

    if (!purchases.length) {
      return res.status(404).json({ message: "No purchases found for this user." });
    }

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error in getUserPurchases:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getPurchaseById = async (req, res) => {
  const { purchaseId } = req.params;

  try {
    const purchase = await Purchase.findById(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found." });
    }

    res.status(200).json(purchase);
  } catch (error) {
    console.error("Error in getPurchaseById:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();

    if (!purchases.length) {
      return res.status(404).json({ message: "No purchases found." });
    }

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error in getAllPurchases:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// API for Real-Time Earnings Report
const getEarningsReport = async (req, res) => {
  const { userId } = req.params;
  try {
    const earnings = await Earnings.find({ userId });

    if (!earnings.length) {
      return res.status(404).json({ message: "No earnings found." });
    }

    const totalEarnings = earnings.reduce((acc, e) => acc + e.amount, 0);
    const breakdown = earnings.reduce((acc, e) => {
      acc[e.source] = (acc[e.source] || 0) + e.amount;
      return acc;
    }, {});

    res.status(200).json({
      totalEarnings,
      breakdown,
    });
  } catch (error) {
    console.error("Error in getEarningsReport:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// API for Visualization Data
const getEarningsVisualization = async (req, res) => {
  const { userId } = req.params;
  try {
    const earnings = await Earnings.find({ userId });

    if (!earnings.length) {
      return res.status(404).json({ message: "No earnings found." });
    }

    const distribution = earnings.map((e) => ({
      source: e.source,
      amount: e.amount,
    }));

    res.status(200).json(distribution);
  } catch (error) {
    console.error("Error in getEarningsVisualization:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { createPurchase, getUserPurchases, getPurchaseById,getAllPurchases, getEarningsReport, getEarningsVisualization};

