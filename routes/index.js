const express = require('express');
const router = express.Router();

router.use('/atividade', require('./atividade'));
router.use('/turma', require('./turma'));
router.use('/login', require('./login'));

module.exports = router;