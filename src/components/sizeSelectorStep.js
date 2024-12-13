import React from 'react';

function SizeSelectorStep({ sizeData, selectedSize, onSelect }) {
  return (
    <div>
      <h2>Select Size</h2>
      <div className="list-group">
        {sizeData.map((size) => (
          <button
            key={size.sizeInInches}
            className={`list-group-item list-group-item-action ${size === selectedSize ? 'active' : ''}`}
            onClick={() => onSelect(size)}
          >
            {size.sizeInInches}" - ${size.price}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SizeSelectorStep;
