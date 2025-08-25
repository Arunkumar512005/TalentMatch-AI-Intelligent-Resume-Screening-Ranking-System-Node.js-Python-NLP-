const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

function detectExt(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  if (lower.endsWith(".docx")) return "docx";
  return "txt";
}

exports.extractText = async (file) => {
  const ext = detectExt(file.originalname);
  if (ext === "pdf") {
    const data = await pdfParse(fs.readFileSync(file.path));
    return data.text || "";
  } else if (ext === "docx") {
    const { value } = await mammoth.extractRawText({ path: file.path });
    return value || "";
  } else {
    return fs.readFileSync(file.path, "utf-8");
  }
};
