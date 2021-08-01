const express = require('express');
const metaController = require('../controllers/metaController');

const router = express.Router();

router.route('/:url*').get(metaController.sendMeta);

module.exports = router;
