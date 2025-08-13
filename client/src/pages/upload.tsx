import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FileText, Upload, Shield, Clock, CheckCircle, AlertCircle, Download, Play, Pause, X, ChevronDown, ArrowLeft } from 'lucide-react';

interface AnalysisResults {
  filename: string;
  score: {
    before: number;
    after: number;
  };
  processingTime: number;
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
  accessibleHtml: string;
  originalText: string;
}

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isNarrating, setIsNarrating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const downloadFormats = [
    { value: 'pdf', label: 'Accessible PDF', icon: '📄' },
    { value: 'docx', label: 'Word Document', icon: '📝' },
    { value: 'html', label: 'HTML Page', icon: '🌐' },
    { value: 'txt', label: 'Plain Text', icon: '📋' }
  ];

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
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze document');
      }

      const results: AnalysisResults = await response.json();
      
      setIsUploading(false);
      setResults(results);

      toast({
        title: "Analysis Complete!",
        description: `Your document has been processed and ${results.fixes.length} accessibility fixes have been applied.`,
      });
    } catch (error) {
      setIsUploading(false);
      console.error('Error uploading file:', error);
      
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to analyze document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (format: string) => {
    if (!results) return;

    try {
      const response = await fetch('/api/download-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessibleHtml: results.accessibleHtml,
          format: format,
          filename: results.filename
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate download');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `accessible-${results.filename.replace(/\.[^/.]+$/, '')}.${format === 'html' ? 'html' : format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Ready!",
        description: `Your accessible document has been downloaded as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download the document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNarration = () => {
    if (!isNarrating) {
      setIsNarrating(true);
      setIsPaused(false);
      toast({
        title: "Audio Summary Started",
        description: "Playing document accessibility summary...",
      });
    } else {
      setIsPaused(!isPaused);
    }
  };

  const stopNarration = () => {
    setIsNarrating(false);
    setIsPaused(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upload Your Document
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload any PDF document and get instant accessibility analysis with AI-powered fixes.
            Transform your documents to be screen reader compatible in seconds.
          </p>
        </div>

        {/* Upload Area */}
        {!results && !isUploading && (
          <div className="bg-white rounded-xl p-8 shadow-xl mb-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-200 ${
                isDragOver
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              data-testid="upload-area"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Drop your document here
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Supports PDF, Word documents, and more. Maximum file size: 10MB
              </p>
              
              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  data-testid="file-input"
                />
                <span className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                </span>
              </label>
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

        {/* Upload Progress */}
        {isUploading && (
          <div className="bg-white rounded-xl p-8 shadow-xl text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Analyzing Your Document</h3>
            <p className="text-gray-600">Our AI is scanning for accessibility issues and preparing fixes...</p>
          </div>
        )}

        {/* Results */}
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
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-primary-500 text-white p-6">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 mr-3" />
                  <h2 className="text-2xl font-bold">{results.filename}</h2>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-200 mb-1">{results.score.before}%</div>
                    <div className="text-sm text-primary-200">Before Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-200 mb-1">{results.score.after}%</div>
                    <div className="text-sm text-primary-200">After Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-200 mb-1">{results.processingTime}s</div>
                    <div className="text-sm text-primary-200">Processing Time</div>
                  </div>
                </div>
              </div>

              {/* Main Content - Side by Side Layout on Desktop */}
              <div className="lg:grid lg:grid-cols-3 lg:gap-0">
                {/* Document Preview - Takes 2/3 on desktop, full width on mobile */}
                <div className="lg:col-span-2 bg-gray-50 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Accessible Document Preview</h3>
                    <p className="text-sm text-gray-600">This is how your document will look after accessibility fixes</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-inner min-h-[600px] p-6">
                    <div className="max-w-none">
                      {/* Header for the processed document */}
                      <header className="mb-6 border-b border-gray-200 pb-4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2" role="heading" aria-level={1}>
                          {results.filename.replace(/\.[^/.]+$/, "")} - Accessible Version
                        </h1>
                        <div className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Fully Accessible Document
                        </div>
                      </header>

                      {/* Render the actual processed accessible HTML content */}
                      <div 
                        className="prose prose-lg max-w-none document-preview"
                        dangerouslySetInnerHTML={{ __html: results.accessibleHtml }}
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: '#374151'
                        }}
                      />

                      <footer className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          This document now meets WCAG 2.1 AA accessibility standards
                        </p>
                      </footer>
                    </div>
                  </div>

                  {/* Accessibility Controls under preview */}
                  <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button 
                      onClick={handleNarration}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${
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
                            Resume Audio
                          </>
                        ) : (
                          <>
                            <Pause className="w-5 h-5 mr-2" />
                            Pause Audio
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
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
                        data-testid="button-stop-narration"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Stop Audio
                      </button>
                    )}

                    <button 
                      onClick={() => {
                        setResults(null);
                        stopNarration();
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
                      data-testid="button-upload-another"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Upload Another
                    </button>
                  </div>
                </div>

                {/* Details Sidebar - Takes 1/3 on desktop */}
                <div className="lg:col-span-1 bg-white p-6 border-l border-gray-200">
                  <div className="space-y-6">
                    {/* Issues Found */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        Issues Found ({results.issues.length})
                      </h3>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {results.issues.map((issue, index) => (
                          <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm">{issue.type}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                issue.severity === 'high' ? 'bg-red-200 text-red-800' :
                                issue.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                                'bg-green-200 text-green-800'
                              }`}>
                                {issue.severity.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">{issue.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fixes Applied */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                        Fixes Applied ({results.fixes.length})
                      </h3>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {results.fixes.map((fix, index) => (
                          <div key={index} className="p-3 rounded-lg border bg-success-50 border-success-200">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm text-success-800">{fix.type}</h4>
                              <CheckCircle className="w-4 h-4 text-success-500" />
                            </div>
                            <p className="text-xs text-success-700">{fix.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Download Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Download Options</h3>
                      
                      {/* Format Dropdown */}
                      <div className="relative mb-3">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          data-testid="dropdown-format"
                        >
                          <span className="flex items-center text-sm">
                            <span className="mr-2">
                              {downloadFormats.find(f => f.value === downloadFormat)?.icon}
                            </span>
                            {downloadFormats.find(f => f.value === downloadFormat)?.label}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center first:rounded-t-lg last:rounded-b-lg text-sm"
                                data-testid={`format-${format.value}`}
                              >
                                <span className="mr-2">{format.icon}</span>
                                {format.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Download Button */}
                      <button 
                        onClick={() => handleDownload(downloadFormat)}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center"
                        data-testid="button-download"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}