const express = require('express');
const router = express.Router();
const { getHeatmapData } = require('../controllers/treeController');

router.get('/heatmap', getHeatmapData);

module.exports = router;
