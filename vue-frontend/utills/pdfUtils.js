// src/utils/pdfUtils.js
export function addHeaderLogo(doc, logoData, margin, yPosition) {
    const getImageFormat = (base64) => {
      if (!base64) return 'JPEG';
      if (base64.includes('data:image/png')) return 'PNG';
      if (base64.includes('data:image/jpeg') || base64.includes('data:image/jpg')) return 'JPEG';
      return 'JPEG'; // default fallback
    };
  
    const getCleanBase64 = (base64) => {
      return base64.includes(',') ? base64.split(',')[1] : base64;
    };
  
    const drawPlaceholder = () => {
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.rect(margin, yPosition, 40, 40); // Placeholder box
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('Official Stamp', margin + 8, yPosition + 23);
    };
  
    if (logoData && logoData.base64) {
      try {
        const format = getImageFormat(logoData.base64);
        const imageData = getCleanBase64(logoData.base64);
  
        const imageProps = doc.getImageProperties(imageData);
        const aspectRatio = imageProps.width / imageProps.height;
  
        const targetHeight = 40;
        const targetWidth = targetHeight * aspectRatio;
  
        doc.addImage(
          imageData,
          format,
          margin,
          yPosition,
          targetWidth,
          targetHeight,
          undefined,
          'FAST'
        );
      } catch (logoError) {
        console.warn('Logo could not be added:', logoError);
        drawPlaceholder();
      }
    } else {
      drawPlaceholder();

    }
  }
  export function calculateTotals(items) {
    let totalQuantity = 0;
    let totalAmount = 0;
  
    items.forEach(item => {
      totalQuantity += Number(item.quantity || 0);
      totalAmount += Number(item.amount || 0);
    });
  
    return { totalQuantity, totalAmount };
  }