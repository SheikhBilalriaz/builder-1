import React from 'react';

const SizeSelector = ({ sizeInInches, price, selected, onSelect }) => {
  const handleClick = () => {
    if (onSelect) onSelect({ sizeInInches, price }); // Pass full item to onSelect
  };
  
  return (
    <div
      className={`Size__Item-sc-1fc4y3t-2 ehwGSv ${selected ? 'selected' : ''}`}
      style={{
        border: selected ? '2px solid blue' : '1px solid rgb(174, 216, 212)',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <div className="Size__ItemSize-sc-1fc4y3t-3 kaFqoB" style={{ color: 'rgba(85, 85, 85, 0.4)' }}>
        {`${sizeInInches}"`}
      </div>
      <div className="PageStyles__ItemPrice-vf4tfb-14 eiIzfa">
        {`$${price}`}
      </div>
    </div>
  );
};

export default SizeSelector;
