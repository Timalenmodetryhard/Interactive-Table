import React from 'react';
import TableCell from './TableCell';

const Row = ({ row, columns, getValue, updateCell, highlightRow, highlightCol, setHighlightRow }) => {
  return (
    <tr
      className={highlightRow ? 'highlight-row' : ''}
    >
      <td
        onClick={setHighlightRow}
      >{row}</td>
      {columns.map((col) => (
        <TableCell
          key={`${row}-${col}`}
          row={row}
          col={col}
          value={getValue(row, col)}
          onUpdate={updateCell}
          highlight={highlightRow || highlightCol === col}
        />
      ))}
    </tr>
  );
};

export default Row;
