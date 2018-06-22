const db = require('../db/queries');
const express = require('express');
const router = express.Router();



router.post('/:restaurant_id', db.createComment);
router.get('/:restaurant_id/comments', db.getComments)


module.exports = router;
