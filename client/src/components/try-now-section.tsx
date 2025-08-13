import { useState, useRef } from "react";
import { CloudUpload, Shield, Clock, CheckCircle } from "lucide-react";

export default function TryNowSection() {
  const [isDragOver, setIsDragOver] = useState(false);
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
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    // TODO: Implement file upload functionality
    console.log('Files to process:', files);
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="gradient-bg py-20" id="try-now">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make Your Documents Accessible?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">Upload any PDF, Word, or PowerPoint document and see instant accessibility improvements.</p>
          
          {/* Upload Interface */}
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-2xl mx-auto">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                isDragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              data-testid="file-upload-zone"
            >
              <CloudUpload className="w-16 h-16 text-gray-400 mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop your document here</h3>
              <p className="text-gray-600 mb-4">Supports PDF, DOCX, PPTX files up to 50MB</p>
              <button 
                onClick={handleSelectFile}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                data-testid="button-select-file"
                aria-label="Select file to upload"
              >
                Select File
              </button>
              <input 
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.pptx"
                onChange={handleFileSelect}
                className="hidden"
                data-testid="file-input"
              />
            </div>
            
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center" data-testid="security-badge">
                <Shield className="text-success-500 w-4 h-4 mr-2" aria-hidden="true" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center" data-testid="speed-badge">
                <Clock className="text-success-500 w-4 h-4 mr-2" aria-hidden="true" />
                <span>Results in seconds</span>
              </div>
              <div className="flex items-center" data-testid="compliance-badge">
                <CheckCircle className="text-success-500 w-4 h-4 mr-2" aria-hidden="true" />
                <span>WCAG 2.1 AA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
