import { X, CheckCircle, AlertTriangle, Play } from "lucide-react";

export default function DemoSection() {
  const beforeIssues = [
    "No semantic structure",
    "Missing alt text for images",
    "Incorrect reading order",
    "Form fields without labels"
  ];

  const afterFixes = [
    "Proper heading structure",
    "Alt text for all images",
    "Logical reading order",
    "Properly labeled form fields"
  ];

  return (
    <section className="bg-gray-100 py-20" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">See The Difference</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Experience how our AI transforms inaccessible documents into fully accessible ones.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden fade-in">
          <div className="flex flex-col lg:flex-row">
            {/* Before Section */}
            <div className="lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <X className="text-white w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Before: Inaccessible</h3>
              </div>
              
              <div className="rounded-lg mb-4 w-full bg-gray-200 p-6 border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-lg font-semibold mb-2">Sample Bank Statement</div>
                  <div className="text-sm mb-4">PDF with accessibility issues</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-red-100 p-2 rounded">No structure</div>
                    <div className="bg-red-100 p-2 rounded">Missing tags</div>
                    <div className="bg-red-100 p-2 rounded">Wrong order</div>
                    <div className="bg-red-100 p-2 rounded">No labels</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {beforeIssues.map((issue, index) => (
                  <div key={index} className="flex items-center text-red-600 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After Section */}
            <div className="lg:w-1/2 p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="text-white w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">After: Fully Accessible</h3>
              </div>
              
              <div className="rounded-lg mb-4 w-full bg-green-50 p-6 border-2 border-success-500">
                <div className="text-center text-gray-700">
                  <div className="text-lg font-semibold mb-2">Sample Bank Statement</div>
                  <div className="text-sm mb-4">PDF with accessibility features</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-success-100 p-2 rounded">Proper tags</div>
                    <div className="bg-success-100 p-2 rounded">Alt text</div>
                    <div className="bg-success-100 p-2 rounded">Correct order</div>
                    <div className="bg-success-100 p-2 rounded">Form labels</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {afterFixes.map((fix, index) => (
                  <div key={index} className="flex items-center text-success-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span>{fix}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 text-center">
            <button 
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center mx-auto"
              data-testid="button-try-demo"
              aria-label="Try the interactive demo"
            >
              <Play className="w-5 h-5 mr-2" aria-hidden="true" />
              Try Interactive Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
