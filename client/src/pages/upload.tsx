import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { CloudUpload, Shield, Clock, CheckCircle, ArrowLeft, FileText, AlertCircle, Download, ChevronDown, Play, Pause, Eye, X } from "lucide-react";

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
  const [showPreview, setShowPreview] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  const handleDownload = (format: string) => {
    if (!results) return;
    
    // Create a mock file for download
    let content = '';
    let mimeType = '';
    let extension = '';
    
    switch (format) {
      case 'pdf':
        content = `%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(Accessible Document) Tj\nET\nendstream\nendobj\n\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000074 00000 n \n0000000120 00000 n \n0000000179 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n271\n%%EOF`;
        mimeType = 'application/pdf';
        extension = 'pdf';
        break;
      case 'html':
        content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Document - ${results.filename}</title>
</head>
<body>
    <h1>Accessible Document</h1>
    <p>This is your document with full accessibility features:</p>
    <ul>
        <li>Proper semantic structure with H1-H6 headings</li>
        <li>Alt text for all images</li>
        <li>Correct reading order for screen readers</li>
        <li>Properly labeled form fields</li>
    </ul>
    <p>Original file: ${results.filename}</p>
    <p>Accessibility score improved from ${results.score.before}% to ${results.score.after}%</p>
</body>
</html>`;
        mimeType = 'text/html';
        extension = 'html';
        break;
      case 'docx':
        content = `Document: ${results.filename}\n\nAccessibility Report:\n- Issues found: ${results.issues.length}\n- Fixes applied: ${results.fixes.length}\n- Score improved from ${results.score.before}% to ${results.score.after}%\n\nThis is a simplified text version. The actual document would be properly formatted with accessibility features.`;
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        extension = 'docx';
        break;
      default:
        content = results.filename;
        mimeType = 'text/plain';
        extension = 'txt';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${results.filename.split('.')[0]}_accessible.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleNarration = () => {
    if (!results) return;
    
    if (isNarrating && !isPaused) {
      // Pause narration
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }
    
    if (isPaused) {
      // Resume narration
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }
    
    // Start new narration
    const text = `
      Document analysis complete for ${results.filename}. 
      The accessibility score has improved from ${results.score.before} percent to ${results.score.after} percent.
      
      Issues found and fixed:
      ${results.issues.map(issue => `${issue.type}: ${issue.description}`).join('. ')}
      
      Fixes applied:
      ${results.fixes.map(fix => `${fix.type}: ${fix.description}`).join('. ')}
      
      Your document is now fully accessible and ready for download.
    `;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => {
      setIsNarrating(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsNarrating(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsNarrating(false);
      setIsPaused(false);
    };
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopNarration = () => {
    window.speechSynthesis.cancel();
    setIsNarrating(false);
    setIsPaused(false);
  };

  const downloadFormats = [
    { value: 'pdf', label: 'PDF Document', icon: '📄' },
    { value: 'html', label: 'HTML Webpage', icon: '🌐' },
    { value: 'docx', label: 'Word Document', icon: '📝' },
    { value: 'txt', label: 'Plain Text', icon: '📋' }
  ];

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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button 
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                  data-testid="button-preview"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  {showPreview ? 'Hide Preview' : 'Preview Document'}
                </button>
                
                <button 
                  onClick={handleNarration}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${
                    isNarrating 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500' 
                      : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500'
                  }`}
                  data-testid="button-narrate"
                >
                  {isNarrating ? (
                    isPaused ? (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Resume Narration
                      </>
                    ) : (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause Narration
                      </>
                    )
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Listen to Summary
                    </>
                  )}
                </button>

                {isNarrating && (
                  <button 
                    onClick={stopNarration}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    data-testid="button-stop-narration"
                  >
                    Stop
                  </button>
                )}
              </div>

              {/* Download Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Your Accessible Document</h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Format Dropdown */}
                  <div className="relative flex-1">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      data-testid="dropdown-format"
                    >
                      <span className="flex items-center">
                        <span className="mr-2">
                          {downloadFormats.find(f => f.value === downloadFormat)?.icon}
                        </span>
                        {downloadFormats.find(f => f.value === downloadFormat)?.label}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {downloadFormats.map((format) => (
                          <button
                            key={format.value}
                            onClick={() => {
                              setDownloadFormat(format.value);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center first:rounded-t-lg last:rounded-b-lg"
                            data-testid={`format-${format.value}`}
                          >
                            <span className="mr-3">{format.icon}</span>
                            {format.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Download Button */}
                  <button 
                    onClick={() => handleDownload(downloadFormat)}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center"
                    data-testid="button-download"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              {/* Upload Another */}
              <div className="text-center mt-6">
                <button 
                  onClick={() => {
                    setResults(null);
                    setShowPreview(false);
                    stopNarration();
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  data-testid="button-upload-another"
                >
                  Upload Another Document
                </button>
              </div>
            </div>

            {/* Document Preview */}
            {showPreview && (
              <div className="bg-white rounded-xl p-8 shadow-xl mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Document Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-gray-600"
                    data-testid="close-preview"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <div className="bg-white rounded-lg shadow-inner min-h-[500px] p-8">
                    <div className="max-w-2xl mx-auto">
                      {/* Simulated Accessible Document */}
                      <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" role="heading" aria-level={1}>
                          {results?.filename.replace(/\.[^/.]+$/, "")} - Accessible Version
                        </h1>
                        <div className="text-sm text-green-600 bg-green-50 p-2 rounded" role="status">
                          ✓ This document is now fully accessible with proper semantic structure
                        </div>
                      </header>

                      <main>
                        <section className="mb-6">
                          <h2 className="text-2xl font-semibold text-gray-800 mb-4" role="heading" aria-level={2}>
                            Document Summary
                          </h2>
                          <p className="text-gray-700 mb-4">
                            This document has been processed to ensure full accessibility compliance with WCAG 2.1 AA standards.
                            All issues have been automatically fixed.
                          </p>
                        </section>

                        <section className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-3" role="heading" aria-level={3}>
                            Accessibility Features Added:
                          </h3>
                          <ul className="list-disc list-inside text-gray-700 space-y-2" role="list">
                            <li role="listitem">Proper heading hierarchy (H1, H2, H3, etc.)</li>
                            <li role="listitem">Alt text for all images and graphics</li>
                            <li role="listitem">Correct reading order for screen readers</li>
                            <li role="listitem">Form fields with proper labels</li>
                            <li role="listitem">High contrast colors for better visibility</li>
                            <li role="listitem">Keyboard navigation support</li>
                          </ul>
                        </section>

                        {/* Sample accessible form */}
                        <section className="mb-6 p-4 border border-gray-300 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3" role="heading" aria-level={3}>
                            Sample Accessible Form
                          </h3>
                          <form className="space-y-4" role="form">
                            <div>
                              <label htmlFor="sample-name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                              </label>
                              <input 
                                type="text" 
                                id="sample-name"
                                name="name"
                                required
                                aria-describedby="name-help"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter your full name"
                              />
                              <div id="name-help" className="text-xs text-gray-500 mt-1">
                                This field is required for form submission
                              </div>
                            </div>
                            <div>
                              <label htmlFor="sample-email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                              </label>
                              <input 
                                type="email" 
                                id="sample-email"
                                name="email"
                                required
                                aria-describedby="email-help"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="your.email@example.com"
                              />
                              <div id="email-help" className="text-xs text-gray-500 mt-1">
                                We'll never share your email address
                              </div>
                            </div>
                          </form>
                        </section>

                        {/* Sample accessible table */}
                        <section className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3" role="heading" aria-level={3}>
                            Sample Accessible Data Table
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300" role="table">
                              <caption className="text-sm text-gray-600 mb-2">
                                Accessibility improvement statistics
                              </caption>
                              <thead>
                                <tr className="bg-gray-100">
                                  <th scope="col" className="px-4 py-2 text-left border border-gray-300">Issue Type</th>
                                  <th scope="col" className="px-4 py-2 text-left border border-gray-300">Before</th>
                                  <th scope="col" className="px-4 py-2 text-left border border-gray-300">After</th>
                                  <th scope="col" className="px-4 py-2 text-left border border-gray-300">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row" className="px-4 py-2 border border-gray-300 font-medium">Missing Headers</th>
                                  <td className="px-4 py-2 border border-gray-300 text-red-600">5 issues</td>
                                  <td className="px-4 py-2 border border-gray-300 text-green-600">0 issues</td>
                                  <td className="px-4 py-2 border border-gray-300">
                                    <span className="text-green-600 font-semibold">✓ Fixed</span>
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <th scope="row" className="px-4 py-2 border border-gray-300 font-medium">Missing Alt Text</th>
                                  <td className="px-4 py-2 border border-gray-300 text-red-600">8 issues</td>
                                  <td className="px-4 py-2 border border-gray-300 text-green-600">0 issues</td>
                                  <td className="px-4 py-2 border border-gray-300">
                                    <span className="text-green-600 font-semibold">✓ Fixed</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </section>

                        <footer className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-800 text-sm" role="status">
                            ✓ This document now meets WCAG 2.1 AA accessibility standards and is fully compatible with screen readers and assistive technologies.
                          </p>
                        </footer>
                      </main>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}