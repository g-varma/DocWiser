import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="text-2xl text-primary-500 mr-2" aria-hidden="true">♿</div>
                <span className="font-bold text-xl text-gray-900">AccessiPDF</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                data-testid="nav-features"
                aria-label="Navigate to features section"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                data-testid="nav-demo"
                aria-label="Navigate to demo section"
              >
                Demo
              </button>
              <button 
                onClick={() => scrollToSection('impact')}
                className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                data-testid="nav-impact"
                aria-label="Navigate to impact section"
              >
                Impact
              </button>
              
              <button 
                onClick={() => scrollToSection('try-now')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                data-testid="nav-try-now"
                aria-label="Try AccessiPDF now"
              >
                Try Now
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                data-testid="mobile-nav-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="text-gray-600 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                data-testid="mobile-nav-demo"
              >
                Demo
              </button>
              <button 
                onClick={() => scrollToSection('impact')}
                className="text-gray-600 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                data-testid="mobile-nav-impact"
              >
                Impact
              </button>
              
              <button 
                onClick={() => scrollToSection('try-now')}
                className="bg-primary-500 hover:bg-primary-600 text-white block px-3 py-2 rounded-lg text-base font-medium w-full text-left"
                data-testid="mobile-nav-try-now"
              >
                Try Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
