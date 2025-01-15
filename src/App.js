import { useState, useRef } from 'react';
import { Stage, Layer, Circle, Image } from 'react-konva';
import ProductOption from './components/ProductOption';
import SizeOption from './components/SizeOption';
import useImage from 'use-image';
import './App.css';

function App() {
  const [customFlow, setCustomFlow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(-1);
  const [selectedSize, setSelectedSize] = useState(0);
  const stageRef = useRef();
  const canvasSize = { width: 400, height: 400 };

  const productSelectionData = [
    { name: "Product 1", price: 45, src: "images/products/product_1.png" },
    { name: "Product 2", price: 65, src: "images/products/product_2.png" },
    { name: "Product 3", price: 105, src: "images/products/product_3.png" },
  ];
  const sizeSelectionData = [
    { price: 20, sizeInInches: 12 },
    { price: 25, sizeInInches: 15 },
    { price: 30, sizeInInches: 18 },
    { price: 35, sizeInInches: 21 }
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

  const ProductImage = ({ src, x, y, width, height }) => {
    const [image] = useImage(src);
    return <Image image={image} x={x} y={y} width={width} height={height} />;
  };

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
                      stroke="grey"
                      strokeWidth={2}
                      fill="transparent"
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
              </Stage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
