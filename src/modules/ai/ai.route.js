const express = require('express');
const aiController = require('../controllers/ai.controller');

const router = express.Router();

router.post('/insight', aiController.getInsight);

module.exports = router;