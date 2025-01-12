import React, { useState, useEffect } from 'react';

const TableCell = ({ row, col, value, onUpdate, highlight }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);

  // Synchronisation de l'état cellValue avec la prop value à chaque mise à jour
  useEffect(() => {
    setCellValue(value);
  }, [value]); // Mettre à jour cellValue lorsque 'value' change

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    // Si la valeur a changé, appeler onUpdate pour mettre à jour la base de données
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
        cellValue || '' // Afficher une chaîne vide si la valeur est undefined
      )}
    </td>
  );
};

export default TableCell;
