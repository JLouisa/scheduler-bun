import jsPDF from "jspdf";
import * as schema from "../../lib/schema";

const JSPDFCreator = () => {
  const generatePDF = () => {
    // Sample data for the table
    const data = [
      [
        "Name",
        "Employee ID",
        "Hours to Work",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
      ["John Doe", "123456", "40", "08", "08", "08", "08", "08", "00", "00"],
      ["Jane Smith", "654321", "35", "09", "09", "09", "09", "09", "00", "00"],
      ["James Brown", "789456", "45", "10", "10", "10", "10", "10", "00", "00"],
    ];

    const doc = new jsPDF();

    // Set table column widths and row heights
    const columnWidths = [30, 25, 25, 15, 15, 15, 15, 15, 15, 15];
    const rowHeights = 10;

    // Set font styles
    doc.setFont("helvetica");
    doc.setFontSize(10);

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
      doc.text(cell, 15 + index * columnWidths[index], 15);
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
        doc.text(cell, 15 + index * columnWidths[index], 15 + i * rowHeights);
      });
    }

    // Save the PDF
    doc.save("schedule.pdf");
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
