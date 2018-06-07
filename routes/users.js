const db = require('../db/queries');
const express = require('express');
const router = express.Router();



router.post('/resturant_id', db.createComment);


module.exports = router;
