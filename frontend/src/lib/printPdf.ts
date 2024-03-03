import html2canvas from "html2canvas";
import jsPdf from "jspdf";

//TODO: Original function not working properly
// export function printPDF() {
//   const domElement = document.getElementById("table-schedule");
//   html2canvas(domElement!, {
//     onclone: (document) => {
//       document.getElementById("download-pdf")!.style.visibility = "hidden";
//     },
//   }).then((canvas) => {
//     const img = canvas.toDataURL("image/png");
//     const pdf = new jsPdf();
//     pdf.addImage(img, "JPEG", 0, 0, canvas.width, canvas.height);
//     pdf.save(`Schedule-${weeklyId}.pdf`);
//   });
// }

//TODO: Refactor this function - Copy from github issue
export const PdfCreator = (weeklyId: string) => {
  const domElement = document.getElementById("table-schedule");

  html2canvas(domElement!, {
    scale: 0.8,
    logging: true,
    allowTaint: false,
    backgroundColor: null,
  }).then(function (canvas) {
    // Export the canvas to its data URI representation
    var base64image = canvas.toDataURL("image/png");

    var imgWidth = 210;
    var pageHeight = 295;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;

    var heightLeft = imgHeight;

    var doc = new jsPdf("p", "mm", "a4");
    var position = 0;

    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addImage(base64image, "PNG", 0, position, imgWidth, imgHeight - 10);
    heightLeft -= pageHeight;
    let p = 2;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight - 10;
      doc.addPage();
      doc.addImage(base64image, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      p++;
    }

    doc.save(`Schedule-${weeklyId}.pdf`);
  });
};
