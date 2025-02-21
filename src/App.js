import { useState, useRef } from 'react';
import { Stage, Layer, Circle, Image, Text } from 'react-konva';
import ProductOption from './components/ProductOption';
import SizeOption from './components/SizeOption';
import MaterialOption from './components/MaterialOption';
import BackgroundOption from './components/BackgroundOption';
import ShapeOption from './components/ShapeOption';
import TextOption from './components/TextOption';
import AddOnOption from './components/AddOnOption';
import useImage from 'use-image';
import './App.css';

function AddOnRenderer({ addOn, canvasSize, color }) {
  const [image] = useImage(addOn.src);
  const shapeWidth = canvasSize.width / 4;
  const shapeHeight = canvasSize.height / 4;
  const [position, setPosition] = useState({
    x: (canvasSize.width - shapeWidth) / 3,
    y: (canvasSize.height - shapeHeight) / 2
  });
  if (addOn.price === 0) return null;
  const handleDragMove = (e) => {
    const { x, y } = e.target.attrs;
    setPosition({ x, y });
  };

  return (
    <Image
      image={image}
      x={position.x}
      y={position.y}
      width={shapeWidth}
      height={shapeHeight}
      draggable
      onDragMove={handleDragMove}
      fill={color}
    />
  )
}

function ShapeRenderer({ shape, canvasSize, color }) {
  const [image] = useImage(shape.src);
  const shapeWidth = canvasSize.width / 1.5;
  const shapeHeight = canvasSize.height / 1.5;
  const [position, setPosition] = useState({
    x: (canvasSize.width - shapeWidth) / 2,
    y: (canvasSize.height - shapeHeight) / 2
  });
  const handleDragMove = (e) => {
    const { x, y } = e.target.attrs;
    setPosition({ x, y });
  };

  return (
    <Image
      image={image}
      x={position.x}
      y={position.y}
      width={shapeWidth}
      height={shapeHeight}
      draggable
      onDragMove={handleDragMove}
      fill={color}
    />
  );
}

function App() {
  const [customFlow, setCustomFlow] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(-1);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedThickness, setSelectedThickness] = useState(0);
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [selectedShape, setSelectedShape] = useState(0);
  const [selectedAddOn, setSelectedAddOn] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAddOnColor, setSelectedAddOnColor] = useState(null);
  const [textOptions, setTextOptions] = useState([]);
  const [selectedPrintOption, setSelectedPrintOption] = useState("back");
  const stageRef = useRef();
  const canvasSize = { width: 400, height: 400 };
  const [shapeX, setShapeX] = useState(canvasSize.width / 2);
  const [shapeY, setShapeY] = useState(canvasSize.height / 2);

  const productSelectionData = [
    { name: "Product 1", price: 45, src: "images/products/product_1.png" },
    { name: "Product 2", price: 65, src: "images/products/product_2.png" },
    { name: "Product 3", price: 105, src: "images/products/product_3.png" },
  ];
  const sizeSelectionData = [
    { price: 20, sizeInInches: 8 },
    { price: 25, sizeInInches: 10 },
    { price: 30, sizeInInches: 12 },
    { price: 35, sizeInInches: 15 },
    { price: 45, sizeInInches: 18 },
  ];
  const materialSelectionData = [
    { price: 20, name: "Birch Plywood" },
    { price: 25, name: "Clear Acrylic" },
    { price: 25, name: "White Acrylic" },
    { price: 25, name: "Black Acrylic" },
  ];
  const thicknessSelectionData = [
    { price: 20, thicknessInMM: 3 },
    { price: 25, thicknessInMM: 6 },
  ];
  const backgroundOptionsData = [
    { price: 25, name: "American", src: "images/backgrounds/American.jpg" },
    { price: 15, name: "Special Walnut", src: "images/backgrounds/SpecialWalnut.jpg" },
    { price: 35, name: "Black", src: "images/backgrounds/Black.jpg" },
  ];
  const shapeSelectionData = [
    { price: 25, name: "Elephant", src: "images/shapes/Elephant.svg" },
    { price: 15, name: "Round", src: "images/shapes/Round.svg" },
    { price: 35, name: "Bear", src: "images/shapes/Bear.svg" },
  ];
  const textOptionsData = [
    { price: 12, text: '' },
    { price: 32, text: '' },
    { price: 45, text: '' },
  ];
  const addOnData = [
    { price: 0, name: "Clear Design", src: "images/addOns/clearDesign.png" },
    { price: 25, name: "Anchor", src: "	images/addOns/Anchor.png" },
    { price: 35, name: "Airplane Cloud", src: "	images/addOns/AirplaneCloud.png" },
  ];
  const colorShades = [
    ['#750261', '#8D0073', '#B20092'],
    ['#400061', '#51127B', '#612798'],
    ['#041A64', '#172B82', '#1C3C9E'],
    ['#003D74', '#005092', '#0265BA'],
    ['#4B0082', '#6A0DAD', '#7B2B8A'],
    ['#0000FF', '#3D65FF', '#6699FF'],
    ['#00BFFF', '#1E90FF', '#4682B4'],
    ['#FF1493', '#FF69B4', '#FF82AB'],
    ['#FF6347', '#FF4500', '#FF5733'],
    ['#800000', '#A52A2A', '#B22222'],
    ['#808080', '#A9A9A9', '#D3D3D3'],
    ['#D2691E', '#CD5C5C', '#F08080'],
  ];
  const onNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const onBack = () => {
    if (currentStep > 1) {
      setCurrentStep((nextStep) => nextStep - 1);
    }
  };

  const handleProductSelection = (index) => {
    setSelectedProduct(index);
    setCustomFlow(index === -1);
  };
  const handleSizeSelect = (index) => {
    setSelectedSize(index);
  };
  const handleMaterialSelect = (index) => {
    setSelectedMaterial(index);
  };
  const handleThicknessSelect = (index) => {
    setSelectedThickness(index);
  };
  const handleBackgroundSelect = (index) => {
    setSelectedBackground(index);
  };
  const handleShapeSelect = (index) => {
    setSelectedShape(index);
  };
  const handleColorChange = (index) => {
    setSelectedColor(index);
  };
  const handleAddOnColorChange = (index) => {
    setSelectedAddOnColor(index);
  }
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
  const handleRemoveTextOption = () => {
    setTextOptions((prevOptions) => prevOptions.slice(0, prevOptions.length - 1));
  };
  const handleDownload = () => {
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({ pixelRatio: 3, mimeType: 'image/png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    link.click();
  };
  const handleAddOnSelect = (index) => {
    setSelectedAddOn(index);
  };

  const ProductImage = ({ src, x, y, width, height }) => {
    const [image] = useImage(src);
    return <Image image={image} x={x} y={y} width={width} height={height} />;
  };
  const [backgroundImage] = useImage(backgroundOptionsData[selectedBackground].src);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="wood_designer_options">
            <div className="options_container">
              {currentStep === 1 && (
                <div className="options_form_step">
                  <h3>Choose your product</h3>
                  <div className="size_selections">
                    <ProductOption
                      key={"customize_product"}
                      price={0}
                      name={"Customize as you wish"}
                      src={null}
                      onSelect={() => handleProductSelection(-1)}
                      isSelected={selectedProduct === -1}
                    />
                    {productSelectionData.map((item, index) => (
                      <ProductOption
                        key={index}
                        price={item.price}
                        name={item.name}
                        src={item.src}
                        onSelect={() => handleProductSelection(index)}
                        isSelected={selectedProduct === index}
                      />
                    ))}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}
              {currentStep === 2 && !customFlow && (
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
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}
              {currentStep === 2 && customFlow && (
                <div className="options_form_step">
                  <h3>Choose your material</h3>
                  <div className="size_selections">
                    {materialSelectionData.map((item, index) => (
                      <MaterialOption
                        key={index}
                        price={item.price}
                        name={item.name}
                        isSelected={selectedMaterial === index}
                        onSelect={() => handleMaterialSelect(index)}
                      />
                    ))}
                  </div>
                  <div className="size_selections">
                    {materialSelectionData[selectedMaterial].name === "Clear Acrylic" && (
                      <select
                        value={selectedPrintOption}
                        onChange={(e) => setSelectedPrintOption(e.target.value)}
                      >
                        <option value={"back"}>Print on Back Side</option>
                        <option value={"top"}>Print on Top Side</option>
                      </select>
                    )}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}
              {currentStep === 3 && !customFlow && (
                <div class="options_form_step">
                  <h3>Summary Info</h3>
                  <div class="summary_info">
                    <div class="summary_detail">
                      <div class="detail">Product:</div>
                      <div class="final_output">{productSelectionData[selectedProduct].name}</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Size:</div>
                      <div class="final_output">{sizeSelectionData[selectedSize].sizeInInches}"</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Material:</div>
                      <div class="final_output">Birch Plywood</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Thickness:</div>
                      <div class="final_output">
                        {[8, 10].includes(sizeSelectionData[selectedSize].sizeInInches) ? "3mm" : "6mm"}
                      </div>
                    </div>
                  </div>
                  <div class="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button>Final</button>
                  </div>
                </div>
              )}
              {currentStep === 3 && customFlow && (
                <div className="options_form_step">
                  <h3>Select the Thickness</h3>
                  <div className="size_selections">
                    {materialSelectionData[selectedMaterial].name === "Birch Plywood" ? (
                      thicknessSelectionData.map((item, index) => (
                        <SizeOption
                          key={index}
                          price={item.price}
                          sizeInInches={item.thicknessInMM}
                          isSelected={selectedThickness === index}
                          onSelect={() => handleThicknessSelect(index)}
                        />
                      ))
                    ) : (
                      <SizeOption
                        key={0}
                        price={thicknessSelectionData[0].price}
                        sizeInInches={thicknessSelectionData[0].thicknessInMM}
                        isSelected={selectedThickness === 0}
                        onSelect={() => handleThicknessSelect(0)}
                      />
                    )}
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}
              {currentStep === 4 && customFlow && (
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
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}
              {currentStep === 5 && customFlow && (
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
              {currentStep === 6 && customFlow && (
                <div className="options_form_step">
                  <h3>Choose your Shape</h3>
                  <div className="background_selections">
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
                  <h3>Shape Color</h3>
                  <div className="color-picker-wrapper">
                    <svg width="400" height="400" viewBox="0 0 400 400">
                      <g onClick={() => handleColorChange(selectedColor === 'black' ? null : 'black')}>
                        <path d="M 200,150 A 50,50 0 0,1 200,250 L 200,200 Z"
                          fill="black"
                          stroke={selectedColor === 'black' ? 'red' : 'black'}
                          strokeWidth={selectedColor === 'black' ? "3" : "1"}
                        />
                      </g>
                      <g onClick={() => handleColorChange(selectedColor === 'white' ? null : 'white')}>
                        <path d="M 200,150 A 50,50 0 0,0 200,250 L 200,200 Z"
                          fill="white"
                          stroke={selectedColor === 'white' ? 'red' : 'black'}
                          strokeWidth={selectedColor === 'white' ? "3" : "1"}
                        />
                      </g>
                      {colorShades.map((shadeGroup, groupIndex) => (
                        <g key={groupIndex}>
                          {shadeGroup.map((shade, shadeIndex) => {
                            const angleStart = (360 / (colorShades.length * shadeGroup.length)) * (groupIndex * shadeGroup.length + shadeIndex);
                            const angleEnd = angleStart + (360 / (colorShades.length * shadeGroup.length));
                            const radius = 150;
                            const startX = 200 + radius * Math.cos((angleStart * Math.PI) / 180);
                            const startY = 200 + radius * Math.sin((angleStart * Math.PI) / 180);
                            const endX = 200 + radius * Math.cos((angleEnd * Math.PI) / 180);
                            const endY = 200 + radius * Math.sin((angleEnd * Math.PI) / 180);
                            const largeArcFlag = angleEnd - angleStart > 180 ? 1 : 0;
                            const isSelected = selectedColor === shade;
                            return (
                              <path
                                key={`${groupIndex}-${shadeIndex}`}
                                d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                                stroke={shade}
                                strokeWidth={isSelected ? "75" : "65"}
                                strokeOpacity={isSelected ? "0.9" : "0.8"}
                                fill="none"
                                onClick={() => handleColorChange(shade)}
                              />
                            );
                          })}
                        </g>
                      ))}
                    </svg>
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}
              {currentStep === 7 && customFlow && (
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
              {currentStep === 8 && customFlow && (
                <div className="options_form_step">
                  <h3>Choose your Add On</h3>
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
                  <h3>Shape Color</h3>
                  <div className="color-picker-wrapper">
                    <svg width="400" height="400" viewBox="0 0 400 400">
                      <g onClick={() => handleAddOnColorChange(selectedAddOnColor === 'black' ? null : 'black')}>
                        <path d="M 200,150 A 50,50 0 0,1 200,250 L 200,200 Z"
                          fill="black"
                          stroke={selectedAddOnColor === 'black' ? 'red' : 'black'}
                          strokeWidth={selectedAddOnColor === 'black' ? "3" : "1"}
                        />
                      </g>

                      <g onClick={() => handleAddOnColorChange(selectedAddOnColor === 'white' ? null : 'white')}>
                        <path d="M 200,150 A 50,50 0 0,0 200,250 L 200,200 Z"
                          fill="white"
                          stroke={selectedAddOnColor === 'white' ? 'red' : 'black'}
                          strokeWidth={selectedAddOnColor === 'white' ? "3" : "1"}
                        />
                      </g>
                      {colorShades.map((shadeGroup, groupIndex) => (
                        <g key={groupIndex}>
                          {shadeGroup.map((shade, shadeIndex) => {
                            const angleStart = (360 / (colorShades.length * shadeGroup.length)) * (groupIndex * shadeGroup.length + shadeIndex);
                            const angleEnd = angleStart + (360 / (colorShades.length * shadeGroup.length));
                            const radius = 150;
                            const startX = 200 + radius * Math.cos((angleStart * Math.PI) / 180);
                            const startY = 200 + radius * Math.sin((angleStart * Math.PI) / 180);
                            const endX = 200 + radius * Math.cos((angleEnd * Math.PI) / 180);
                            const endY = 200 + radius * Math.sin((angleEnd * Math.PI) / 180);
                            const largeArcFlag = angleEnd - angleStart > 180 ? 1 : 0;
                            const isSelected = selectedAddOnColor === shade;
                            return (
                              <path
                                key={`${groupIndex}-${shadeIndex}`}
                                d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                                stroke={shade}
                                strokeWidth={isSelected ? "75" : "65"}
                                strokeOpacity={isSelected ? "0.9" : "0.8"}
                                fill="none"
                                onClick={() => handleAddOnColorChange(shade)}
                              />
                            );
                          })}
                        </g>
                      ))}
                    </svg>
                  </div>
                  <div className="step_form_handler">
                    <button onClick={onBack}>Back</button>
                    <button onClick={onNext}>Next</button>
                  </div>
                </div>
              )}
              {currentStep === 9 && customFlow && (
                <div class="options_form_step">
                  <h3>Summary Info</h3>
                  <div class="summary_info">
                    <div class="summary_detail">
                      <div class="detail">Size:</div>
                      <div class="final_output">{sizeSelectionData[selectedSize].sizeInInches}"</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Thickness:</div>
                      <div class="final_output">
                        {thicknessSelectionData[selectedThickness].thicknessInMM}mm
                      </div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Shape:</div>
                      <div class="final_output">{shapeSelectionData[selectedShape].name}</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Shape Color:</div>
                      <div class="final_output">{selectedColor}</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Background:</div>
                      <div class="final_output">{backgroundOptionsData[selectedBackground].name}</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Add on design:</div>
                      <div class="final_output">{addOnData[selectedAddOn].name}</div>
                    </div>
                    <div class="summary_detail">
                      <div class="detail">Add On Color:</div>
                      <div class="final_output">{selectedAddOnColor}</div>
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
        <div className="col-lg-6">
          <div className="canvas_container">
            <div className="inner_canvas_container">
              <Stage ref={stageRef} width={canvasSize.width} height={canvasSize.height}>
                <Layer>
                  {selectedProduct === -1 ? (
                    <Circle
                      x={canvasSize.width / 2}
                      y={canvasSize.height / 2}
                      radius={canvasSize.width / 2.25}
                      strokeWidth={2}
                      fillPatternImage={backgroundImage}
                    />
                  ) : (
                    <ProductImage
                      src={productSelectionData[selectedProduct].src}
                      x={0}
                      y={0}
                      width={canvasSize.width}
                      height={canvasSize.height}
                    />
                  )}
                </Layer>
                {selectedProduct === -1 ? (
                  <>
                    <Layer>
                      <ShapeRenderer
                        shape={shapeSelectionData[selectedShape]}
                        canvasSize={canvasSize}
                        color={selectedColor}
                      />
                    </Layer>
                    <Layer>
                      <AddOnRenderer
                        addOn={addOnData[selectedAddOn]}
                        canvasSize={canvasSize}
                        color={selectedAddOnColor}
                      />
                    </Layer>
                    {textOptions.length !== 0 ? (
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
                    ) : null}
                  </>
                ) : null}
              </Stage>
            </div>
          </div>
          <div className="canvas_handlers">
            <button className="share_btns" onClick={handleDownload}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
