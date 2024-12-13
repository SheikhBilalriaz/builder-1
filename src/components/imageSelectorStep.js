import React from 'react';

function ImageSelectorStep({ images, selectedImage, onSelect }) {
  return (
    <div>
      <h2>Select Shape</h2>
      <div className="d-flex flex-wrap">
        {images.map((image) => (
          <div
            key={image.src}
            className={`p-2 ${image === selectedImage ? "selected" : ""}`}
          >
            <img
              src={image.src}
              alt="shape"
              width={100}
              height={100}
              style={{
                cursor: 'pointer',
                border: image === selectedImage ? '2px solid blue' : 'none',
                transition: 'transform 0.3s ease', // Add a transition for hover effect
              }}
              onClick={() => onSelect(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSelectorStep;
