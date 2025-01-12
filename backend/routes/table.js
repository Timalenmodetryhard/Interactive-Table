const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Table = require('../models/Table');

const generateDefaultData = (rows, columns) => {
  const data = [];
  for (let row = 1; row <= rows; row++) {
    for (const col of columns) {
      data.push({ row, col, value: `Valeur ${col}${row}` });
    }
  }
  return data;
};

router.get('/', async (req, res) => {
  try {
    const tableData = await Table.find();

    if (tableData.length === 0) {
      const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const rows = 10;
      const defaultData = generateDefaultData(rows, columns);

      await Table.insertMany(defaultData);
      return res.status(200).json(defaultData);
    }

    res.status(200).json(tableData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des données', error });
  }
});

router.post('/', async (req, res) => {
  const { row, col, value } = req.body;

  if (!row || !col || value === undefined) {
    return res.status(400).json({ message: 'Paramètres manquants : row, col ou value' });
  }

  try {
    let cell = await Table.findOne({ row, col });

    if (cell) {
      cell.value = value;
      await cell.save();
    } else {
      cell = new Table({ row, col, value });
      await cell.save();
    }

    res.status(200).json({ message: 'Cellule mise à jour', cell });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la cellule', error });
  }
});

router.delete('/', async (req, res) => {
    try {
      await Table.deleteMany({});
  
      const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const rows = 10;
      const defaultData = generateDefaultData(rows, columns);
  
      await Table.insertMany(defaultData);
  
      res.status(200).json({ message: 'Tableau réinitialisé avec les valeurs par défaut' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la réinitialisation du tableau', error });
    }
  });
  

module.exports = router;