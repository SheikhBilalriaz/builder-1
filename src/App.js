import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import SizeSelectorStep from './components/sizeSelectorStep';
import ImageSelectorStep from './components/imageSelectorStep';
import TextCustomizationStep from './components/textCustomizationStep';
import { drawCanvas } from './components/CanvasDrawing';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const sizeData = [
    { sizeInInches: 12, price: 25 },
    { sizeInInches: 15, price: 30 },
    { sizeInInches: 18, price: 35 },
    { sizeInInches: 21, price: 40 },
    { sizeInInches: 24, price: 45 },
  ];

  const imageData = [
    { src: 'https://hickorysigndesigner.com/shapeImages/Cloud.svg', price: 10 },
    { src: 'https://hickorysigndesigner.com/shapeImages/Bear.svg', price: 15 },
    { src: 'https://hickorysigndesigner.com/shapeImages/Football.svg', price: 20 },
    { src: 'https://hickorysigndesigner.com/shapeImages/Flower.svg', price: 25 },
    { src: 'https://hickorysigndesigner.com/shapeImages/MountainShape.svg', price: 30 },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizeData[0]);
  const [selectedImage, setSelectedImage] = useState(imageData[0]);
  const [texts, setTexts] = useState([{ text: "", fontSize: 16, textColor: "#000000" }]);

  const canvasRef = useRef(null);

  const handleNextStep = useCallback(() => setCurrentStep(prev => prev + 1), []);
  const handlePreviousStep = useCallback(() => setCurrentStep(prev => prev - 1), []);
  const handleTextChange = useCallback((index, field, value) => {
    setTexts(prevTexts => {
      const updatedTexts = [...prevTexts];
      updatedTexts[index][field] = value;
      return updatedTexts;
    });
  }, []);
  const handleAddText = useCallback(() => {
    setTexts(prevTexts => [...prevTexts, { text: "", fontSize: 16, textColor: "#000000" }]);
  }, []);

  // Draw the canvas whenever selections change
  useEffect(() => {
    drawCanvas(canvasRef, selectedSize, selectedImage, texts);
  }, [selectedSize, selectedImage, texts]);

  const isCircleShape = selectedImage.src.includes('Cloud') || selectedImage.src.includes('Football'); 

  return (
    <div className="App container">
      <h1 className="text-center my-4">Design Your Wooden Piece</h1>

      <div className="row">
        <div className="col-md-6">
          {currentStep === 1 && (
            <SizeSelectorStep
              sizeData={sizeData}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
          )}
          {currentStep === 2 && (
            <ImageSelectorStep
              images={imageData}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
            />
          )}
          {currentStep === 3 && (
            <TextCustomizationStep
              texts={texts}
              onTextChange={handleTextChange}
              onAddText={handleAddText}
            />
          )}
        </div>

        <div className="col-md-6">
          <h3>Live Preview</h3>
          <canvas 
            ref={canvasRef} 
            className={isCircleShape ? 'canvas-circle' : 'canvas-rectangle'} 
            width={500} 
            height={500} 
            style={{ border: '1px solid #ccc' }} 
          />
        </div>
      </div>

      <div className="d-flex justify-content-between mt-3">
        {currentStep > 1 && (
          <button className="btn btn-secondary" onClick={handlePreviousStep}>
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button className="btn btn-primary" onClick={handleNextStep}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
