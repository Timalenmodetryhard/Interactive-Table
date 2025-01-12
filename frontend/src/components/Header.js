import React from 'react';

const Header = ({ columns, highlight, setHighlightCol }) => {
  return (
    <thead>
      <tr>
        <th></th>
        {columns.map((col) => (
          <th
            key={col}
            onClick={() => setHighlightCol(col)} // Active le surlignage de la colonne
            className={highlight === col ? 'highlight' : ''}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
