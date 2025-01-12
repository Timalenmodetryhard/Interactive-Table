import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Row from './Row';

const Table = () => {
  const [data, setData] = useState([]);
  const [highlightedCol, setHighlightedCol] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);

  const tableRef = useRef(null);

  const API_PORT = process.env.REACT_APP_PORT_BACKEND

  useEffect(() => {
    fetch(`http://localhost:${API_PORT}/table`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Error:', err));

      const handleClickOutside = (e) => {
        if (tableRef.current && !tableRef.current.contains(e.target)) {
          setHighlightedRow(null);
          setHighlightedCol(null);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
  }, [API_PORT]);

  const updateCell = (row, col, value) => {
    fetch(`http://localhost:${API_PORT}/table`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ row, col, value }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData((prevData) =>
            prevData.map((cell) =>
              cell.row === row && cell.col === col ? { ...cell, value } : cell
            )
          );
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  const resetTable = () => {
    fetch(`http://localhost:${API_PORT}/table`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          fetch(`http://localhost:${API_PORT}/table`)
            .then((res) => res.json())
            .then(setData)
            .catch((err) => console.error('Error:', err));
        }
      })
      .catch((err) => console.error('Error while trying to reset the table:', err));
  };


  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getValue = (row, col) => {
      const cell = data.find((cell) => cell.row === row && cell.col === col);

      return cell ? cell.value : '';   
  };

  console.log(data)
  return (
    <div>
        <button onClick={resetTable}>Reset the table</button>
        <table  ref={tableRef}>
        <Header
            columns={columns}
            highlight={highlightedCol}
            setHighlightCol={(col) => {
            setHighlightedCol(col);
            setHighlightedRow(null);
            }}
        />
        <tbody>
            {rows.map((row) => (
            <Row
                key={row}
                row={row}
                columns={columns}
                getValue={getValue}
                updateCell={updateCell}
                highlightRow={highlightedRow === row}
                highlightCol={highlightedCol}
                setHighlightRow={() => {
                setHighlightedRow(row);
                setHighlightedCol(null);
                }}
            />
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default Table;
