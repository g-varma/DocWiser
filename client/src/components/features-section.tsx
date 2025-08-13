import { Tags, ArrowDownUp, FileText, Volume2, Code, Cloud, CheckCircle } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Tags,
      title: "Smart Tagging",
      description: "Automatically identifies and tags paragraphs, headers, lists, and other document elements for proper screen reader navigation.",
      badge: "AI-Powered Detection"
    },
    {
      icon: ArrowDownUp,
      title: "Reading Order Fix",
      description: "Corrects the logical reading sequence so screen readers follow the intended document flow.",
      badge: "Instant Correction"
    },
    {
      icon: FileText,
      title: "Form Labels",
      description: "Adds proper labels and descriptions to form fields, making interactive documents fully accessible.",
      badge: "WCAG Compliant"
    },
    {
      icon: Volume2,
      title: "Voice Summary",
      description: "Generates audio summaries of key document information for quick understanding.",
      badge: "AI-Generated Audio"
    },
    {
      icon: Code,
      title: "HTML Conversion",
      description: "Creates fully accessible HTML versions of documents with proper semantic structure.",
      badge: "Semantic HTML"
    },
    {
      icon: Cloud,
      title: "Cloud-Based",
      description: "No software installation required. Process documents directly in your browser with enterprise-grade security.",
      badge: "Instant Access"
    }
  ];

  return (
    <section className="bg-white py-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">AI-Powered Accessibility Fixes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our intelligent system automatically detects and remedies accessibility issues in seconds.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl fade-in card-hover"
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-12 h-12 bg-success-500 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="text-white w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-success-500 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>{feature.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
