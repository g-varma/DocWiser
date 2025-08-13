import formidable from "formidable-serverless";
import fs from "fs";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File parsing failed" });

    try {
      const filePath = files.document?.filepath || files.file?.filepath;
      const fileBuffer = fs.readFileSync(filePath);

      const geminiKey = process.env.GEMINI_API_KEY;
      // TODO: Call your Gemini API here using fileBuffer & geminiKey
      // Replace the next line with real PDF result from Gemini
      const resultPdf = fileBuffer;

      res.setHeader("Content-Type", "application/pdf");
      res.send(resultPdf);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
