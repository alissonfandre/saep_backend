const express = require('express');
const router = express.Router();
const db = require('../db');

const tabela = 'turmas';

router.post('/turma', (req, res) => {
    const { nome_turma } = req.body;

    if (!nome_turma) {
        return res.status(400).send('Nome da turma é obrigatório');
    }

    const sql = `INSERT INTO ${tabela} (nome_turma) VALUES (?)`;

    db.query(sql, [nome_turma], (err, results) => {
        if (err) {
            console.error('Erro ao inserir turma:', err);
            return res.status(500).send('Erro ao inserir turma. Tente novamente mais tarde.');
        }

        res.status(201).send('Turma inserida com sucesso!');
    });
});

router.get('/turmas', (req, res) => {
    const sql = `SELECT * FROM ${tabela}`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar turmas:', err);
            return res.status(500).send('Erro ao buscar turmas. Tente novamente mais tarde.');
        }

        res.send(results);
    });
});

router.get('/turma/id/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM ${tabela} WHERE id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar turma por ID:', err);
            return res.status(500).send('Erro ao buscar turma por ID. Tente novamente mais tarde.');
        }

        if (results.length === 0) {
            return res.status(404).send('Turma não encontrada');
        }

        res.send(results[0]);
    });
});

router.get('/turma/nome/:nome', (req, res) => {
    const nome = req.params.nome;
    const sql = `SELECT * FROM ${tabela} WHERE nome_turma LIKE '%${nome}%'`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar turma por nome:', err);
            return res.status(500).send('Erro ao buscar turma por nome. Tente novamente mais tarde.');
        }

        if (results.length === 0) {
            return res.status(404).send('Turma não encontrada');
        }

        res.send(results);
    });
});

module.exports = router;
