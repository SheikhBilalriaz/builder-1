import React from 'react';

function TextCustomizationStep({ texts, onTextChange, onAddText }) {
  return (
    <div>
      <h2>Customize Text</h2>
      {texts.map((text, index) => (
        <div key={index} className="mb-3">
          <input
            type="text"
            className="form-control"
            value={text.text}
            onChange={(e) => onTextChange(index, 'text', e.target.value)}
          />
          <div className="d-flex mt-2">
            <input
              type="number"
              className="form-control me-2"
              value={text.fontSize}
              onChange={(e) => onTextChange(index, 'fontSize', parseInt(e.target.value))}
              placeholder="Font Size"
            />
            <input
              type="color"
              className="form-control"
              value={text.textColor}
              onChange={(e) => onTextChange(index, 'textColor', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={onAddText}>
        Add Text
      </button>
    </div>
  );
}

export default TextCustomizationStep;
