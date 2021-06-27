const { Router } = require('express');

const router = Router();

const auth = require('../../middleware/authJwt')

router.route('/').get(auth.verifyToken)

module.exports = router;