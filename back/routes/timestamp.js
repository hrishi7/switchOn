const express = require('express');
const {save, getlast} = require('../controllers/timestamp');

const router = express.Router();

router.post('/',save)

router.get('/', getlast)

module.exports = router;