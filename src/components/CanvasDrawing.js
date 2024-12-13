export const drawCanvas = (canvasRef, selectedSize, selectedImage, texts) => {
  const canvas = canvasRef.current;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const canvasWidth = selectedSize.sizeInInches * 20;
    const canvasHeight = selectedSize.sizeInInches * 20;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear the canvas only when the content actually changes
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Caching the image so that it's not fetched again during each render
    const img = selectedImage.cachedImg || new Image();
    
    // If image is not already cached, load and cache it
    if (!selectedImage.cachedImg) {
      img.src = selectedImage.src;
      selectedImage.cachedImg = img;
    }

    // Once image is loaded, draw it on the canvas
    img.onload = () => {
      const imageWidth = selectedSize.sizeInInches * 10;
      const imageHeight = selectedSize.sizeInInches * 10;
      ctx.drawImage(img, (canvasWidth - imageWidth) / 2, (canvasHeight - imageHeight) / 2, imageWidth, imageHeight);
    };
    
    img.onerror = () => {
      ctx.fillText("Image failed to load", canvasWidth / 2 - 50, canvasHeight / 2); // Fallback message
    };

    // Determine the shape type (e.g., circle, square, etc.)
    const isCircle = selectedImage.shape === 'circle'; // Ensure that the image data has a shape property

    if (isCircle) {
      ctx.beginPath();
      ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, 0, Math.PI * 2);
      ctx.clip(); // Clip the canvas to a circle
    }

    // Draw text elements
    texts.forEach((text, index) => {
      ctx.font = `${text.fontSize}px Arial`;
      ctx.fillStyle = text.textColor;
      const textX = (canvasWidth - ctx.measureText(text.text).width) / 2; // Center the text
      ctx.fillText(text.text, textX, 150 + (index * 30)); // Adjust position for each text element
    });
  }
};
