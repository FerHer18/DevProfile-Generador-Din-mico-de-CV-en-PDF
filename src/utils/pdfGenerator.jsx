import { pdf } from "@react-pdf/renderer";
import PDFDocument from "../componentes/PDFDocument";

export const generarPDF = async (cv) => {

  const blob = await pdf(
    <PDFDocument cv={cv} />
  ).toBlob();

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${cv.nombre}-CV.pdf`;

  link.click();

};