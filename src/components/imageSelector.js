import React from 'react';

export default function ImageSelector({ src, price, selected, onSelect }) {
  return (
    <div
      className={`card ${selected ? 'border-primary' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect({ src, price })} // Pass full item to onSelect
    >
      <img
        src={src}
        alt="Option"
        className="card-img-top"
        style={{ maxHeight: '150px', objectFit: 'cover' }}
      />
      <div className="card-body text-center">
        <p className="card-text">${price}</p>
      </div>
    </div>
  );
}
