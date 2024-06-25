const express = require('express');
const router = express.Router();
const db = require('../db');

const tabela = 'professores'; 

router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = `SELECT * FROM ${tabela} WHERE email = ?`;

    db.query(sql, [email], (err, results) => {
        if (err) {
            throw err;
        }
        
        if (results.length > 0) {
            const professor = results[0];
            if (professor.senha === senha) {
                res.send(professor);
            } else {
                res.send({ error: 'SENHA_ERRADA' });
            }
        } else {
            res.send({ error: 'EMAIL_NAO_ENCONTRADO' });
        }
    });
});

module.exports = router;
