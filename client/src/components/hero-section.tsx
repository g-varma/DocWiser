import { Upload, Play } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-white overflow-hidden" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Make Every Document
            <span className="text-primary-500"> Accessible</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Over 60% of essential documents like bank statements and medical bills are inaccessible to screen readers. 
            Our AI-powered tool instantly analyzes and fixes accessibility issues in any PDF or document.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('try-now')}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 card-hover flex items-center"
              data-testid="button-analyze-document"
              aria-label="Start analyzing documents"
            >
              <Upload className="w-5 h-5 mr-2" aria-hidden="true" />
              Analyze Your Document
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="border-2 border-gray-300 hover:border-primary-500 text-gray-700 hover:text-primary-500 px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center"
              data-testid="button-watch-demo"
              aria-label="Watch demo video"
            >
              <Play className="w-5 h-5 mr-2" aria-hidden="true" />
              Watch Demo
            </button>
          </div>
        </div>
        <div className="mt-16 fade-in">
          <div className="rounded-xl shadow-2xl mx-auto bg-gray-100 p-8 max-w-4xl">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AccessiPDF Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="border border-gray-200 rounded p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Document: bank_statement.pdf</span>
                  <span className="text-sm text-success-500 font-medium">✓ Analysis Complete</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500 mb-1">15</div>
                    <div className="text-xs text-gray-600">Issues Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-500 mb-1">100%</div>
                    <div className="text-xs text-gray-600">Auto-Fixed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-500 mb-1">2.3s</div>
                    <div className="text-xs text-gray-600">Processing Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
