import hljs from "highlight.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const mapContentToPdf = async (content: any) => {
  switch (content.type) {
    case "heading":
      let fontSize;
      switch (content.attrs.level) {
        case 1:
          fontSize = 20;
          break;
        case 2:
          fontSize = 18;
          break;
        case 3:
          fontSize = 16;
          break;
        default:
          fontSize = 14;
          break;
      }
      return {
        text: content.content[0].text,
        fontSize: fontSize,
      };
    case "paragraph":
      return content.content && content.content[0]
        ? { text: content.content[0].text, fontSize: 14 }
        : {};
    case "taskList":
      return {
        text: content.content
          .map((taskItem: any) => {
            const taskText = taskItem.content[0].content
              .map((textItem: any) => textItem.text)
              .join(" ");
            return `□ ${taskText}\n`;
          })
          .join(""),
      };
    case "bulletList":
      return {
        ul: content.content.map((item: any) => item.content[0].content[0].text),
      };
    case "orderedList":
      return {
        ol: content.content.map((item: any) => item.content[0].content[0].text),
      };
    case "blockquote":
      return { text: content.content[0].content[0].text, italics: true };
    case "codeBlock":
      const highlightedCode = hljs.highlightAuto(content.content[0].text).value;
      const codeElement = document.createElement("pre");
      codeElement.innerHTML = highlightedCode;
      codeElement.style.fontFamily = "monospace";
      codeElement.style.fontSize = "12px";
      codeElement.style.color = "grey";
      codeElement.style.background = "#1F2A37";
      codeElement.style.padding = "10px";
      codeElement.style.margin = "5px 0 15px 0";
      document.body.appendChild(codeElement);
      const canvas = await html2canvas(codeElement, { scale: 2 }); // Increase scale for better image quality
      const imgData = canvas.toDataURL("image/png");
      document.body.removeChild(codeElement);
      return {
        image: imgData,
        width: canvas.width,
        height: canvas.height,
      };
    case "image":
      const response = await fetch(content.attrs.src);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve({
            image: reader.result,
            width: content.attrs.width || 500,
          });
        reader.readAsDataURL(blob);
      });
    default:
      return {};
  }
};

export const convertToPDF = async (content: any) => {
  const doc = new jsPDF("p", "pt", "a4");
  const extractedContent = await Promise.all(
    content.content.content.map(mapContentToPdf)
  );
  extractedContent.forEach((item: any) => {
    if (item.image) {
      const imgWidth = doc.internal.pageSize.getWidth() - 40; // Set image width to page width minus margins
      if (item.width && item.height) {
        const imgHeight = (item.height * imgWidth) / item.width; // Calculate image height to maintain aspect ratio
        doc.addImage(item.image, "PNG", 20, 20, imgWidth, imgHeight); // Add image with margins of 20pt
      } else {
        // Fallback in case width or height is not defined
        doc.addImage(item.image, "PNG", 20, 20, imgWidth, imgWidth); // Use square aspect ratio as fallback
      }
      doc.addPage();
    } else if (item.text) {
      doc.setFontSize(item.fontSize || 14);
      doc.text(item.text, 20, 20); // Add text with margins of 20pt
      doc.addPage();
    }
  });
  doc.save("content.pdf");
};
