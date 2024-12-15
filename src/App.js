import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Image, Rect } from "react-konva";
import './App.css';
import SizeOption from './components/SizeOption';
import ShapeOption from './components/ShapeOption';
import TextOption from './components/TextOption';
import useImage from "use-image";
import BackgroundOption from './components/BackgroundOption';
import AddOnOption from './components/AddOnOption';

function ShapeRenderer({ shape, canvasSize }) {
  const [image] = useImage(shape.src);
  const shapeWidth = canvasSize.width / 1.5;
  const shapeHeight = canvasSize.height / 1.5;
  const x = (canvasSize.width - shapeWidth) / 2;
  const y = (canvasSize.height - shapeHeight) / 2;

  return (
    <Image
      image={image}
      x={x}
      y={y}
      width={shapeWidth}
      height={shapeHeight}
    />
  );
}

function BackgroundRenderer({ background, canvasSize }) {
  const [image] = useImage(background.src);
  return (
    <Image
      image={image}
      x={0}
      y={0}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
}

function AddOnRenderer({ addOn, canvasSize }) {
  const [image] = useImage(addOn.src);
  if (addOn.price === 0) return null;
  const shapeWidth = canvasSize.width / 4;
  const shapeHeight = canvasSize.height / 4;
  const x = (canvasSize.width - shapeWidth) / 3;
  const y = (canvasSize.height - shapeHeight) / 2;
  return (
    <Image
      image={image}
      x={x}
      y={y}
      width={shapeWidth}
      height={shapeHeight}
    />
  )
}

function App() {
  const totalSteps = 6;
  const [currentStep, setCurrentStep] = useState(1);
  const onNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  const onBack = () => {
    if (currentStep > 1) {
      setCurrentStep((nextStep) => nextStep - 1);
    }
  };

  const [totalCost, setTotalCost] = useState(0);

  const stageRef = useRef();

  const sizeSelectionData = [
    { price: 20, sizeInInches: 12 },
    { price: 25, sizeInInches: 15 },
    { price: 30, sizeInInches: 18 },
    { price: 35, sizeInInches: 21 }
  ];
  const [selectedSize, setSelectedSize] = useState(0);
  const handleSizeSelect = (index) => {
    setSelectedSize(index);
  };

  const shapeSelectionData = [
    { price: 25, name: "Planked Rectangle", src: "https://hickorysigndesigner.com/shapeImages/PlankedRectangle.svg" },
    { price: 15, name: "Round", src: "https://hickorysigndesigner.com/shapeImages/Round.svg" },
    { price: 35, name: "Bear", src: "https://hickorysigndesigner.com/shapeImages/Bear.svg" },
  ];
  const [selectedShape, setSelectedShape] = useState(0);
  const handleShapeSelect = (index) => {
    setSelectedShape(index);
  };

  const textOptionsData = [
    { price: 12, text: '' },
    { price: 32, text: '' },
    { price: 45, text: '' },
  ];
  const [textOptions, setTextOptions] = useState([]);
  const handleAddTextOption = () => {
    if (textOptions.length < 3) {
      const newId = textOptions.length;
      setTextOptions((prevOptions) => [
        ...prevOptions,
        {
          id: newId,
          price: textOptionsData[newId].price,
          x: 50,
          y: 50,
          text: '',
          color: '#000000',
          font: 'Arial',
          fontSize: '16',
          rotation: 0
        },
      ]);
    }
  };

  const handleUpdateTextOption = (id, text, color, font, fontSize, rotation) => {
    setTextOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id
          ? { ...option, text, color, font, fontSize, rotation }
          : option
      )
    );
  };

  const backgroundOptionsData = [
    { price: 25, name: "American", src: "https://hickorysigndesigner.com/stainPicturesSmall/American.jpg" },
    { price: 15, name: "Dark Walnut", src: "https://hickorysigndesigner.com/stainPicturesSmall/DarkWalnut.jpg" },
    { price: 35, name: "Black", src: "https://hickorysigndesigner.com/stainPicturesSmall/Black.jpg" },
  ];
  const [selectedBackground, setSelectedBackground] = useState(0);
  const handleBackgroundSelect = (index) => {
    setSelectedBackground(index);
  };

  const addOnData = [
    { price: 0, name: "Clear Design", src: "https://hickorysigndesigner.com/static/images/clearDesign.png" },
    { price: 25, name: "Anchor", src: "	https://hickorysigndesigner.com/preMadeDesignsPng/Anchor.png" },
  ];
  const [selectedAddOn, setSelectedAddOn] = useState(0);
  const handleAddOnSelect = (index) => {
    setSelectedAddOn(index);
  };

  const handleRemoveTextOption = () => {
    setTextOptions((prevOptions) => prevOptions.slice(0, prevOptions.length - 1));
  };

  const canvasSize = { width: 400, height: 400 };

  useEffect(() => {
    const sizePrice = sizeSelectionData[selectedSize]?.price || 0;
    const shapePrice = shapeSelectionData[selectedShape]?.price || 0;
    const backgroundPrice = backgroundOptionsData[selectedBackground]?.price || 0;
    const textPrice = textOptions.reduce((acc, text) => acc + (text?.price || 0), 0);
    const addOnPrice = addOnData[selectedAddOn]?.price || 0;
    setTotalCost(sizePrice + shapePrice + backgroundPrice + textPrice + addOnPrice);
  }, [selectedSize, selectedShape, selectedBackground, textOptions, selectedAddOn]);

  const handleDownload = () => {
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({ pixelRatio: 3, mimeType: 'image/png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    link.click();
  };

  return (
    <div className="container">
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-indicator"
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
            }}
          ></div>
        </div>
        <div className="steps">
          <span className={currentStep === 1 ? "active-step" : ""}>Step 1: Size</span>
          <span className={currentStep === 2 ? "active-step" : ""}>Step 2: Shape</span>
          <span className={currentStep === 3 ? "active-step" : ""}>Step 3: Text</span>
          <span className={currentStep === 4 ? "active-step" : ""}>Step 4: Background</span>
          <span className={currentStep === 5 ? "active-step" : ""}>Step 5: Add on</span>
          <span className={currentStep === totalSteps ? "active-step" : ""}>Final Step: Summary</span>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="wood_designer_options">
            <div className="options_container">
              {currentStep === 1 && (
                <div className="options_form_step">
                  <h3>Choose your size</h3>
                  <div className="size_selections">
                    {sizeSelectionData.map((item, index) => (
                      <SizeOption
                        key={index}
                        price={item.price}
                        sizeInInches={item.sizeInInches}
                        isSelected={selectedSize === index}
                        onSelect={() => handleSizeSelect(index)}
                      />
                    ))}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="options_form_step">
                  <h3>Choose your shape</h3>
                  <div className="shape_selections">
                    {shapeSelectionData.map((item, index) => (
                      <ShapeOption
                        key={index}
                        price={item.price}
                        name={item.name}
                        src={item.src}
                        isSelected={selectedShape === index}
                        onSelect={() => handleShapeSelect(index)}
                      />
                    ))}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="options_form_step">
                  <h3>Add Text</h3>
                  <div className="text_selections">
                    {textOptions.map((option, index) => (
                      <TextOption
                        key={option.id}
                        wordIndex={index + 1}
                        price={option.price}
                        onUpdateTextOption={handleUpdateTextOption}
                      />
                    ))}
                    {textOptions.length < 3 && (
                      <div className="add_text">
                        <button onClick={handleAddTextOption}>Add Text</button>
                      </div>
                    )}
                    {textOptions.length > 0 && (
                      <div className="remove_text">
                        <button onClick={handleRemoveTextOption}>Remove Last Text</button>
                      </div>
                    )}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="options_form_step">
                  <h3>Choose your Background</h3>
                  <div className="background_selections">
                    {backgroundOptionsData.map((item, index) => (
                      <BackgroundOption
                        key={index}
                        price={item.price}
                        name={item.name}
                        src={item.src}
                        isSelected={selectedBackground === index}
                        onSelect={() => handleBackgroundSelect(index)}
                      />
                    ))}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="options_form_step">
                  <h3>Choose your Background</h3>
                  <div className="background_selections">
                    {addOnData.map((item, index) => (
                      <AddOnOption
                        key={index}
                        price={item.price}
                        name={item.name}
                        src={item.src}
                        isSelected={selectedAddOn === index}
                        onSelect={() => handleAddOnSelect(index)}
                      />
                    ))}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}

              {currentStep === totalSteps && (
                <div class="options_form_step">
                  <h3>Summary Info</h3>
                  <div class="summary_info">
                    <div class="summary_detail">
                      <div class="detail">Size:</div>
                      <div class="final_output">{sizeSelectionData[selectedSize].sizeInInches}"</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Shape:</div>
                      <div class="final_output">{shapeSelectionData[selectedShape].name}</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Background:</div>
                      <div class="final_output">{backgroundOptionsData[selectedBackground].name}</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Add on design:</div>
                      <div class="final_output">{addOnData[selectedAddOn].name}</div>
                    </div>
                  </div>
                  <div class="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button>Final</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="canvas_container">
            <div className="inner_canvas_container">
              <Stage ref={stageRef} width={canvasSize.width} height={canvasSize.height}>
                <Layer>
                  {/* Render background */}
                  <BackgroundRenderer
                    background={backgroundOptionsData[selectedBackground]}
                    canvasSize={canvasSize}
                  />
                </Layer>
                <Layer>
                  {/* Render shape */}
                  <ShapeRenderer
                    shape={shapeSelectionData[selectedShape]}
                    canvasSize={canvasSize}
                  />
                </Layer>
                <Layer>
                  {/* Add On shape */}
                  <AddOnRenderer
                    addOn={addOnData[selectedAddOn]}
                    canvasSize={canvasSize}
                  />
                </Layer>
                <Layer>
                  {textOptions.map((option) => (
                    <Text
                      key={option.id}
                      x={option.x}
                      y={option.y}
                      text={option.text}
                      fontSize={option.fontSize}
                      fontFamily={option.font}
                      fill={option.color}
                      draggable
                      rotation={option.rotation}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>

          <div className="canvas_handlers">
            <button className="share_btns" onClick={handleDownload}>Download</button>
            <button className="share_btns">Share</button>
            <button className="total_cost">${totalCost}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;