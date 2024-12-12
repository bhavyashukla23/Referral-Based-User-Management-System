const express = require('express');
const router = express.Router();
const { createPurchase, getUserPurchases, getPurchaseById, getAllPurchases, getEarningsReport, getEarningsVisualization} = require('../controllers/purchase.controller');


router.post('/create', createPurchase);
router.get('/user/:userId', getUserPurchases);
router.get('/:purchaseId', getPurchaseById);
router.get('/', getAllPurchases);
router.get("/earnings/report/:userId", getEarningsReport);
router.get("/earnings/visualization/:userId", getEarningsVisualization);

module.exports = router;
