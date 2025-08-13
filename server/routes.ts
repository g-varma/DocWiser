import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { analyzeDocumentAccessibility, generateAccessibleDocument } from './gemini.js';

// Configure multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: uploadStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to handle document upload and analysis
  app.post('/api/analyze-document', upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log('Analyzing document:', req.file.originalname);
      
      // Analyze the document using Gemini
      const analysis = await analyzeDocumentAccessibility(req.file.path, req.file.originalname);
      
      // Clean up uploaded file after processing
      fs.unlinkSync(req.file.path);
      
      const response = {
        filename: req.file.originalname,
        score: {
          before: analysis.beforeScore,
          after: analysis.afterScore
        },
        processingTime: Math.floor(Math.random() * 5) + 2, // Simulated processing time
        issues: analysis.issues,
        fixes: analysis.fixes,
        accessibleHtml: analysis.accessibleHtml,
        originalText: analysis.originalText
      };

      res.json(response);
    } catch (error) {
      console.error('Error analyzing document:', error);
      
      // Clean up file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({ 
        error: 'Failed to analyze document',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Route to download accessible document
  app.post('/api/download-document', async (req, res) => {
    try {
      const { accessibleHtml, format, filename } = req.body;
      
      if (!accessibleHtml) {
        return res.status(400).json({ error: 'No document content provided' });
      }

      const analysis = {
        originalText: '',
        accessibleHtml,
        issues: [],
        fixes: [],
        beforeScore: 0,
        afterScore: 100
      };

      const documentBuffer = await generateAccessibleDocument(analysis, format);
      
      const fileExtension = format === 'html' ? 'html' : 'html';
      const downloadFilename = `accessible-${filename.replace(/\.[^/.]+$/, '')}.${fileExtension}`;
      
      res.setHeader('Content-Disposition', `attachment; filename="${downloadFilename}"`);
      res.setHeader('Content-Type', format === 'html' ? 'text/html' : 'application/octet-stream');
      
      res.send(documentBuffer);
    } catch (error) {
      console.error('Error generating download:', error);
      res.status(500).json({ 
        error: 'Failed to generate download',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
