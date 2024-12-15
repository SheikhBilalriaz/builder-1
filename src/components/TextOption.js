import React, { useState, useEffect } from 'react';

export default function TextOption({ wordIndex, price, onUpdateTextOption }) {
    const [text, setText] = useState('');
    const [remainingChars, setRemainingChars] = useState(22);
    const [color, setColor] = useState('#000000');
    const [font, setFont] = useState('Arial');
    const [fontSize, setFontSize] = useState(16);
    const [rotation, setRotation] = useState(0);

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        const maxChars = 22;
        if (inputText.length <= maxChars) {
            setText(inputText);
            setRemainingChars(maxChars - inputText.length);
        }
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const handleFontChange = (e) => {
        setFont(e.target.value);
    };

    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 1);
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => (prevSize > 1 ? prevSize - 1 : 1));
    };

    const handleTextRotation = (e) => {
        const newRotation = parseInt(e.target.value, 10) || 0;
        setRotation(newRotation);
    };

    useEffect(() => {
        onUpdateTextOption(wordIndex - 1, text, color, font, fontSize, rotation);
    }, [text, color, font, fontSize, rotation, onUpdateTextOption, wordIndex]);

    return (
        <div className="text_option">
            <div className="text_head">
                <div className="head_word">Text {wordIndex}:</div>
                <div className="word_count_left">{remainingChars} characters left</div>
            </div>
            <input
                type="text"
                className="input_text"
                placeholder="Enter text"
                value={text}
                onChange={handleTextChange}
            />
            <div className="text_price">${price}</div>
            <div className="text_handler">
                <input
                    type="color"
                    className="text_color"
                    value={color}
                    onChange={handleColorChange}
                />
                <select
                    className="text_font"
                    value={font}
                    onChange={handleFontChange}
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                </select>
                <div className="text_font_size">
                    <div className="size_head">Size</div>
                    <div className="min_size" onClick={decreaseFontSize}>-</div>
                    <div className="max_size" onClick={increaseFontSize}>+</div>
                </div>
            </div>
            <div className="text_handler">
                <div className='text_font_size' style={{ width: 'fit-content' }}>
                    <div className="size_head">Rotation</div>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={rotation}
                        onChange={handleTextRotation}
                    />
                </div>
            </div>
        </div>
    );
}
