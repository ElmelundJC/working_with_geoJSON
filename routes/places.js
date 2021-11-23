const express = require('express');
const { getUser, addUser } = require('../controllers/places');

const router = express.Router();

router.route('/').get(getUser).post(addUser);

module.exports = router;