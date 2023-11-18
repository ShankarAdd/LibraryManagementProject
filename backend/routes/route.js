const express = require('express');

const router = express.Router();

const genController = require('../controllers/control');

router.get('/get-gen',genController.getGen);

router.post('/post-gen',genController.postGen);

module.exports = router;