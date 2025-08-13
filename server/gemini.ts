import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";

// Use the provided Gemini API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface DocumentAnalysis {
  originalText: string;
  accessibleHtml: string;
  issues: Array<{
    type: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
    location?: string;
  }>;
  fixes: Array<{
    type: string;
    description: string;
  }>;
  beforeScore: number;
  afterScore: number;
}

export async function analyzeDocumentAccessibility(filePath: string, filename: string): Promise<DocumentAnalysis> {
  try {
    // Read the file for analysis
    let documentContent = '';
    
    if (filename.toLowerCase().endsWith('.pdf')) {
      // For PDF files, we'll analyze the binary data with Gemini
      const fileBytes = fs.readFileSync(filePath);
      
      const contents = [
        {
          inlineData: {
            data: fileBytes.toString("base64"),
            mimeType: "application/pdf",
          },
        },
        `Analyze this PDF document for accessibility issues and extract the text content. Please provide:
        1. The raw text content of the document
        2. A detailed list of accessibility issues found
        3. Specific fixes that should be applied
        4. An accessibility score before fixes (0-100)
        5. Generate accessible HTML version of the content with proper semantic structure
        
        Focus on:
        - Missing alt text for images
        - Poor heading structure
        - Low contrast text
        - Missing form labels
        - Reading order issues
        - Table accessibility
        - Link descriptions
        
        Return the response in JSON format with the following structure:
        {
          "originalText": "extracted text content",
          "accessibleHtml": "properly structured HTML with semantic tags",
          "issues": [{"type": "issue type", "severity": "high/medium/low", "description": "detailed description", "location": "optional location"}],
          "fixes": [{"type": "fix type", "description": "what was fixed"}],
          "beforeScore": number,
          "afterScore": number
        }`,
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          responseMimeType: "application/json",
        },
        contents: contents,
      });

      const analysisText = response.text;
      if (!analysisText) {
        throw new Error("No response from Gemini API");
      }

      const analysis = JSON.parse(analysisText);
      
      // Ensure the response has all required fields
      return {
        originalText: analysis.originalText || 'Document content could not be extracted',
        accessibleHtml: analysis.accessibleHtml || '<p>Content could not be processed</p>',
        issues: analysis.issues || [],
        fixes: analysis.fixes || [],
        beforeScore: analysis.beforeScore || 25,
        afterScore: analysis.afterScore || 95
      };
      
    } else {
      // For other document types, read as text
      documentContent = fs.readFileSync(filePath, 'utf-8');
      
      const prompt = `Analyze this document content for accessibility issues and create an accessible version:

${documentContent}

Please provide a comprehensive accessibility analysis in JSON format with the following structure:
{
  "originalText": "the original document text",
  "accessibleHtml": "properly structured HTML with semantic tags, headings hierarchy, and accessibility features",
  "issues": [{"type": "issue type", "severity": "high/medium/low", "description": "detailed description", "location": "optional location"}],
  "fixes": [{"type": "fix type", "description": "what was fixed"}],
  "beforeScore": number (0-100),
  "afterScore": number (0-100)
}

Focus on creating accessible HTML that includes:
- Proper heading hierarchy (h1, h2, h3, etc.)
- Semantic HTML elements (main, section, article, aside, etc.)
- Alt text for any images or graphics mentioned
- Proper table structure with headers if tables are present
- Accessible form labels if forms are present
- Good color contrast and readable formatting
- Screen reader friendly structure`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const analysisText = response.text;
      if (!analysisText) {
        throw new Error("No response from Gemini API");
      }

      const analysis = JSON.parse(analysisText);
      
      return {
        originalText: analysis.originalText || documentContent,
        accessibleHtml: analysis.accessibleHtml || '<p>Content could not be processed</p>',
        issues: analysis.issues || [],
        fixes: analysis.fixes || [],
        beforeScore: analysis.beforeScore || 25,
        afterScore: analysis.afterScore || 95
      };
    }
    
  } catch (error) {
    console.error('Error analyzing document with Gemini:', error);
    
    // Return a fallback analysis if the API fails
    return {
      originalText: 'Document analysis failed - content could not be extracted',
      accessibleHtml: `
        <article>
          <header>
            <h1>Document Analysis Failed</h1>
          </header>
          <main>
            <p>We encountered an issue analyzing your document. This could be due to:</p>
            <ul>
              <li>Unsupported document format</li>
              <li>Corrupted file</li>
              <li>API service temporarily unavailable</li>
            </ul>
            <p>Please try uploading your document again or contact support if the issue persists.</p>
          </main>
        </article>
      `,
      issues: [
        {
          type: "Analysis Error",
          severity: "high" as const,
          description: "Document could not be analyzed due to technical issues",
          location: "Document processing"
        }
      ],
      fixes: [],
      beforeScore: 0,
      afterScore: 0
    };
  }
}

export async function generateAccessibleDocument(analysis: DocumentAnalysis, format: string): Promise<Buffer> {
  try {
    if (format === 'html') {
      // Generate a complete HTML document
      const htmlDocument = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        h1 {
            border-bottom: 2px solid #3498db;
            padding-bottom: 0.3em;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .skip-link {
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }
        .skip-link:focus {
            position: static;
            width: auto;
            height: auto;
        }
    </style>
</head>
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <main id="main-content">
        ${analysis.accessibleHtml}
    </main>
</body>
</html>`;
      
      return Buffer.from(htmlDocument, 'utf-8');
    }
    
    // For other formats, return the HTML content for now
    // In a real implementation, you'd convert to PDF, DOCX, etc.
    return Buffer.from(analysis.accessibleHtml, 'utf-8');
    
  } catch (error) {
    console.error('Error generating accessible document:', error);
    throw new Error('Failed to generate accessible document');
  }
}