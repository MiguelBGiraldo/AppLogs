const express = require('express');
const router = express.Router();
const healthController = require('./healthController');

router
    .route('/health')
    .get(healthController.checkHealth);

router
    .route('/ready')
    .get(healthController.checkReady);

router
    .route('/live')
    .get(healthController.checkLive);

module.exports = router;