var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboard');

/* GET dashboard. */
router.get('/', dashboardController.dashboard_get);

module.exports = router;
