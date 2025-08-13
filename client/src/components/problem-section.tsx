import { AlertTriangle, FileText, Users, Building2 } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="bg-gray-100 py-20" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Accessibility Crisis</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Essential documents that control our daily lives are systematically excluding millions of people.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center fade-in card-hover" data-testid="stat-inaccessible-pdfs">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-500 w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">60%</h3>
            <p className="text-gray-600">of PDFs are partially or completely inaccessible to screen readers</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm text-center fade-in card-hover" data-testid="stat-daily-documents">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-red-500 w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Millions</h3>
            <p className="text-gray-600">of essential documents created daily without accessibility consideration</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm text-center fade-in card-hover" data-testid="stat-affected-people">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-red-500 w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">285M+</h3>
            <p className="text-gray-600">people worldwide with visual impairments affected by inaccessible documents</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Document Types That Fail Accessibility</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center p-4 bg-red-50 rounded-lg" data-testid="document-type-bank">
              <Building2 className="text-red-500 w-6 h-6 mr-3" aria-hidden="true" />
              <span className="text-gray-700 font-medium">Bank Statements</span>
            </div>
            <div className="flex items-center p-4 bg-red-50 rounded-lg" data-testid="document-type-medical">
              <FileText className="text-red-500 w-6 h-6 mr-3" aria-hidden="true" />
              <span className="text-gray-700 font-medium">Medical Bills</span>
            </div>
            <div className="flex items-center p-4 bg-red-50 rounded-lg" data-testid="document-type-utility">
              <FileText className="text-red-500 w-6 h-6 mr-3" aria-hidden="true" />
              <span className="text-gray-700 font-medium">Utility Bills</span>
            </div>
            <div className="flex items-center p-4 bg-red-50 rounded-lg" data-testid="document-type-legal">
              <FileText className="text-red-500 w-6 h-6 mr-3" aria-hidden="true" />
              <span className="text-gray-700 font-medium">Legal Documents</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
