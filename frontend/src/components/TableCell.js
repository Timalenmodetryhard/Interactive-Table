import React, { useState, useEffect } from 'react';

const TableCell = ({ row, col, value, onUpdate, highlight }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);

  useEffect(() => {
    setCellValue(value);
  }, [value]);
  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    if (cellValue !== value) {
      onUpdate(row, col, cellValue);
    }
  };

  const handleChange = (e) => setCellValue(e.target.value);

  return (
    <td
      onDoubleClick={handleDoubleClick}
      className={highlight ? 'highlight' : ''}
    >
      {isEditing ? (
        <input
          type="text"
          value={cellValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        cellValue || '' 
      )}
    </td>
  );
};

export default TableCell;
