const express = require('express');
const router = express.Router();
const db = require('../db');

const tabelaAtividades = 'atividades';
const tabelaTurmas = 'turmas';


router.post('/atividade', async (req, res) => {
    const { numero_atividade, descricao, turma_id } = req.body;

    if (!numero_atividade || !descricao || !turma_id) {
        return res.status(400).send('Número da atividade, descrição e turma são obrigatórios');
    }

    try {
      
        const verificaTurmaSql = `SELECT * FROM ${tabelaTurmas} WHERE id = ?`;
        const [turmaExists] = await db.query(verificaTurmaSql, [turma_id]);

        if (!turmaExists) {
            return res.status(404).send('Turma não encontrada');
        }

        const sql = `INSERT INTO ${tabelaAtividades} (numero_atividade, descricao, turma_id) VALUES (?, ?, ?)`;
        await db.query(sql, [numero_atividade, descricao, turma_id]);

        res.status(201).send('Atividade inserida com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir atividade:', error);
        res.status(500).send('Erro ao inserir atividade. Tente novamente mais tarde.');
    }
});


router.get('/atividades', async (req, res) => {
    try {
        const sql = `
            SELECT a.id, a.numero_atividade, a.descricao, t.nome_turma
            FROM ${tabelaAtividades} a
            INNER JOIN ${tabelaTurmas} t ON a.turma_id = t.id
        `;
        const atividades = await db.query(sql);
        res.send(atividades);
    } catch (error) {
        console.error('Erro ao buscar atividades:', error);
        res.status(500).send('Erro ao buscar atividades. Tente novamente mais tarde.');
    }
});


router.get('/atividade/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const sql = `
            SELECT a.id, a.numero_atividade, a.descricao, t.nome_turma
            FROM ${tabelaAtividades} a
            INNER JOIN ${tabelaTurmas} t ON a.turma_id = t.id
            WHERE a.id = ?
        `;
        const [atividade] = await db.query(sql, [id]);

        if (!atividade) {
            return res.status(404).send('Atividade não encontrada');
        }

        res.send(atividade);
    } catch (error) {
        console.error('Erro ao buscar atividade por ID:', error);
        res.status(500).send('Erro ao buscar atividade por ID. Tente novamente mais tarde.');
    }
});


router.delete('/atividade/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const sql = `DELETE FROM ${tabelaAtividades} WHERE id = ?`;
        const result = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Atividade não encontrada');
        }

        res.send('Atividade excluída com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        res.status(500).send('Erro ao excluir atividade. Tente novamente mais tarde.');
    }
});

module.exports = router;
