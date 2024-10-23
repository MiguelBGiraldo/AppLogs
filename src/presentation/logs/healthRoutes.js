const express = require('express');
const router = express.Router();
const healthController = require('./healthController');

router
    .route('/health')
    .get(healthController.checkHealth);

module.exports = router;