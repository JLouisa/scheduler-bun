import jsPDF from "jspdf";

const generatePDF = () => {
  // Sample data for the table
  const data = [
    ["Name", "Age", "City"],
    ["John Doe", "30", "New York"],
    ["Jane Smith", "25", "Los Angeles"],
    ["James Brown", "40", "Chicago"],
  ];

  const doc = new jsPDF();

  // Set table column widths and row heights
  const columnWidths = [80, 30, 60]; // Adjust as needed
  const rowHeights = 20; // Adjust as needed

  // Set font styles
  doc.setFont("helvetica");
  doc.setFontSize(12);

  // Add table header
  doc.setTextColor(255, 255, 255); // Set text color to white
  doc.setFillColor(0, 0, 0); // Set fill color to black
  doc.rect(
    10,
    10,
    columnWidths.reduce((a, b) => a + b),
    rowHeights,
    "F"
  ); // Draw table header rectangle
  doc.setTextColor(255, 255, 255); // Set text color back to white for header text
  data[0].forEach((cell, index) => {
    doc.text(cell, 15 + index * columnWidths[index], 20);
  });

  // Add table rows
  doc.setDrawColor(0); // Reset draw color to black
  doc.setTextColor(0); // Reset text color to black
  for (let i = 1; i < data.length; i++) {
    doc.rect(
      10,
      10 + i * rowHeights,
      columnWidths.reduce((a, b) => a + b),
      rowHeights,
      "S"
    ); // Draw table row rectangle
    data[i].forEach((cell, index) => {
      doc.text(cell, 15 + index * columnWidths[index], 20 + i * rowHeights);
    });
  }

  // Save the PDF
  doc.save("table.pdf");
};

const JSPDFCreator = () => {
  const generatePDF = () => {
    // Sample data for the table
    const data = [
      ["Name", "Age", "City"],
      ["John Doe", "30", "New York"],
      ["Jane Smith", "25", "Los Angeles"],
      ["James Brown", "40", "Chicago"],
    ];

    const doc = new jsPDF();

    // Set table column widths and row heights
    const columnWidths = [80, 30, 60]; // Adjust as needed
    const rowHeights = 20; // Adjust as needed

    // Set font styles
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Add table header
    doc.setTextColor(255, 255, 255); // Set text color to white
    doc.setFillColor(0, 0, 0); // Set fill color to black
    doc.rect(
      10,
      10,
      columnWidths.reduce((a, b) => a + b),
      rowHeights,
      "F"
    ); // Draw table header rectangle
    doc.setTextColor(255, 255, 255); // Set text color back to white for header text
    data[0].forEach((cell, index) => {
      doc.text(cell, 15 + index * columnWidths[index], 20);
    });

    // Add table rows
    doc.setDrawColor(0); // Reset draw color to black
    doc.setTextColor(0); // Reset text color to black
    for (let i = 1; i < data.length; i++) {
      doc.rect(
        10,
        10 + i * rowHeights,
        columnWidths.reduce((a, b) => a + b),
        rowHeights,
        "S"
      ); // Draw table row rectangle
      data[i].forEach((cell, index) => {
        doc.text(cell, 15 + index * columnWidths[index], 20 + i * rowHeights);
      });
    }

    // Save the PDF
    doc.save("table.pdf");
  };

  const handleButtonClick = () => {
    generatePDF();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Generate PDF</button>
    </div>
  );
};

export default JSPDFCreator;
