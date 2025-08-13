import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { CloudUpload, Shield, Clock, CheckCircle, ArrowLeft, FileText, AlertCircle, Download } from "lucide-react";

interface AnalysisResult {
  filename: string;
  issues: {
    type: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  fixes: {
    type: string;
    description: string;
    applied: boolean;
  }[];
  score: {
    before: number;
    after: number;
  };
  processingTime: number;
}

export default function Upload() {
  const [, setLocation] = useLocation();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    setIsUploading(true);
    
    // Simulate file processing with realistic results
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const file = files[0];
    const mockResult: AnalysisResult = {
      filename: file.name,
      issues: [
        {
          type: "Missing semantic structure",
          description: "Document lacks proper heading hierarchy and semantic tags",
          severity: 'high'
        },
        {
          type: "No alternative text",
          description: "Images and graphics missing descriptive alt text",
          severity: 'high'
        },
        {
          type: "Incorrect reading order",
          description: "Content reading sequence doesn't match visual layout",
          severity: 'medium'
        },
        {
          type: "Form fields without labels",
          description: "Interactive elements lack proper accessibility labels",
          severity: 'high'
        }
      ],
      fixes: [
        {
          type: "Added semantic structure",
          description: "Applied proper H1-H6 heading hierarchy and semantic HTML tags",
          applied: true
        },
        {
          type: "Generated alt text",
          description: "AI-generated descriptive alt text for all images and graphics",
          applied: true
        },
        {
          type: "Fixed reading order",
          description: "Corrected logical reading sequence for screen readers",
          applied: true
        },
        {
          type: "Added form labels",
          description: "Proper labels and descriptions added to all form elements",
          applied: true
        }
      ],
      score: {
        before: 15,
        after: 98
      },
      processingTime: 2.3
    };
    
    setResults(mockResult);
    setIsUploading(false);
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleBackToHome = () => {
    setLocation('/');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackToHome}
              className="flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-200"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center">
              <div className="text-2xl text-primary-500 mr-2" aria-hidden="true">♿</div>
              <span className="font-bold text-xl text-gray-900">AccessiPDF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!results && !isUploading && (
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upload Your Document
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload any PDF, Word, or PowerPoint document to analyze and fix accessibility issues instantly.
            </p>
          </div>
        )}

        {!results && !isUploading && (
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <div 
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
                isDragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              data-testid="file-upload-zone"
            >
              <CloudUpload className="w-20 h-20 text-gray-400 mb-6 mx-auto" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Drop your document here</h3>
              <p className="text-gray-600 mb-6">Supports PDF, DOCX, PPTX files up to 50MB</p>
              <button 
                onClick={handleSelectFile}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                data-testid="button-select-file"
              >
                Select File
              </button>
              <input 
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.pptx"
                onChange={handleFileSelect}
                className="hidden"
                data-testid="file-input"
              />
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center" data-testid="security-badge">
                <Shield className="text-success-500 w-5 h-5 mr-2" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center" data-testid="speed-badge">
                <Clock className="text-success-500 w-5 h-5 mr-2" />
                <span>Results in seconds</span>
              </div>
              <div className="flex items-center" data-testid="compliance-badge">
                <CheckCircle className="text-success-500 w-5 h-5 mr-2" />
                <span>WCAG 2.1 AA</span>
              </div>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="bg-white rounded-xl p-8 shadow-xl text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Analyzing Your Document</h3>
            <p className="text-gray-600">Our AI is scanning for accessibility issues and preparing fixes...</p>
          </div>
        )}

        {results && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Analysis Complete
              </h1>
              <p className="text-lg text-gray-600">
                Your document has been analyzed and accessibility issues have been fixed.
              </p>
            </div>

            {/* Results Summary */}
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{results.filename}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">{results.score.before}%</div>
                  <div className="text-sm text-gray-600">Before Score</div>
                </div>
                <div className="text-center p-6 bg-success-50 rounded-lg">
                  <div className="text-3xl font-bold text-success-600 mb-2">{results.score.after}%</div>
                  <div className="text-sm text-gray-600">After Score</div>
                </div>
                <div className="text-center p-6 bg-primary-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{results.processingTime}s</div>
                  <div className="text-sm text-gray-600">Processing Time</div>
                </div>
              </div>

              {/* Issues Found */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                  Issues Found
                </h3>
                <div className="space-y-3">
                  {results.issues.map((issue, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{issue.type}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          issue.severity === 'high' ? 'bg-red-200 text-red-800' :
                          issue.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {issue.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm mt-2">{issue.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixes Applied */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-success-500 mr-2" />
                  Fixes Applied
                </h3>
                <div className="space-y-3">
                  {results.fixes.map((fix, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-success-50 border-success-200">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-success-800">{fix.type}</h4>
                        <CheckCircle className="w-5 h-5 text-success-500" />
                      </div>
                      <p className="text-sm mt-2 text-success-700">{fix.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Fixed PDF
                </button>
                <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download HTML Version
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Upload Another
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}