const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Table = require('../models/Table');

const generateDefaultData = (rows, columns) => {
  const data = [];
  for (let row = 1; row <= rows; row++) {
    for (const col of columns) {
      data.push({ row, col, value: `Value ${col}${row}` });
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
    res.status(500).json({ message: 'Error while trying to get the datas', error });
  }
});

router.post('/', async (req, res) => {
  const { row, col, value } = req.body;

  if (!row || !col || value === undefined) {
    return res.status(400).json({ message: 'Missing parameters : row, col or value' });
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

    res.status(200).json({ message: 'The cell have been updated', cell });
  } catch (error) {
    res.status(500).json({ message: 'Error while trying to reset the cell', error });
  }
});

router.delete('/', async (req, res) => {
    try {
      await Table.deleteMany({});
  
      const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const rows = 10;
      const defaultData = generateDefaultData(rows, columns);
  
      await Table.insertMany(defaultData);
  
      res.status(200).json({ message: 'The table have been succefully reseted' });
    } catch (error) {
      res.status(500).json({ message: 'Error while trying to reset the table', error });
    }
  });
  

module.exports = router;