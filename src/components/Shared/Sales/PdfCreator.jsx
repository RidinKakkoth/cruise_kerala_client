// export default generatePdfData;
import jsPDF from 'jspdf';

const downloadPdf = (bookings) => {
  const doc = new jsPDF();

  // Set up the theme colors and font size
  const theme = {
    primaryColor: "#0055ff",
    secondaryColor: "#ffffff",
    textColor: "#333333",
    tableHeaderBackground: "#f2f2f2",
    tableRowEven: "#f8f8f8",
    tableRowOdd: "#ffffff",
    fontSize: 10, // Adjust the font size as needed
  };

  doc.setFontSize(theme.fontSize);
  doc.setTextColor(theme.textColor);
  doc.setFont('helvetica', 'bold'); // Set the font and font style

  doc.setFontSize(18);
  
  doc.text("Cruise Kerala  Sales Report", 15, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let yPos = 30;
  bookings.forEach((booking, index) => {
    // Alternate row colors for better readability
    const rowColor = index % 2 === 0 ? theme.tableRowEven : theme.tableRowOdd;

    // Draw table header
    if (yPos === 30) {
      doc.setFillColor(theme.primaryColor);
      doc.setTextColor(theme.secondaryColor);
      doc.rect(3, yPos, 205, 10, "F");
      doc.text("Date", 5, yPos + 7);
      doc.text("Customer", 25, yPos + 7); // Adjust the position to make space for longer data
      doc.text("Cruise", 70, yPos + 7); // Adjust the position to make space for longer data
      doc.text("Check-in", 90, yPos + 7);
      doc.text("Check-out", 115, yPos + 7);
      doc.text("Cruise Fee", 140, yPos + 7);
      doc.text("Tax", 165, yPos + 7);
      doc.text("Total", 190, yPos + 7);
      yPos += 10;
    }

    doc.setFillColor(rowColor);
    doc.rect(15, yPos, 240, 10, "F");
    doc.setTextColor(theme.textColor);
    doc.text(new Date(booking.createdAt).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }), 5, yPos + 7);
    doc.text(booking.userId.email, 25, yPos + 7);
    doc.text(booking.cruiseId.name, 70, yPos + 7);
    doc.text(new Date(booking.checkIn).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }), 90, yPos + 7);
    doc.text(new Date(booking.checkOut).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }), 115, yPos + 7);
    doc.text("Rs " + booking.fee, 140, yPos + 7);
    doc.text("Rs " + booking.tax, 165, yPos + 7);
    doc.text("Rs " + booking.total, 190, yPos + 7);

    yPos += 10;
    if (yPos >= 280) {
      doc.addPage();
      yPos = 20;
    }
  });

  doc.save('sales_report.pdf');
};

export default downloadPdf;

