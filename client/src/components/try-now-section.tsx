import { useLocation } from "wouter";
import { CloudUpload, Shield, Clock, CheckCircle } from "lucide-react";

export default function TryNowSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="gradient-bg py-20" id="try-now">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make Your Documents Accessible?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">Upload any PDF, Word, or PowerPoint document and see instant accessibility improvements.</p>
          
          {/* Upload Interface */}
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-2xl mx-auto">
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 border-gray-300 hover:border-primary-500 cursor-pointer"
              onClick={() => setLocation('/upload')}
              data-testid="file-upload-zone"
            >
              <CloudUpload className="w-16 h-16 text-gray-400 mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Click to upload your document</h3>
              <p className="text-gray-600 mb-4">Supports PDF, DOCX, PPTX files up to 50MB</p>
              <button 
                onClick={() => setLocation('/upload')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                data-testid="button-select-file"
                aria-label="Go to upload page"
              >
                Start Upload
              </button>
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
