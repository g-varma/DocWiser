export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-2xl text-primary-400 mr-2" aria-hidden="true">♿</div>
              <span className="font-bold text-xl">AccessiPDF</span>
            </div>
            <p className="text-gray-400 mb-4">Making every document accessible to everyone, everywhere.</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200" 
                aria-label="Follow us on Twitter"
                data-testid="footer-social-twitter"
              >
                <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">T</span>
                </div>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200" 
                aria-label="Follow us on LinkedIn"
                data-testid="footer-social-linkedin"
              >
                <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">in</span>
                </div>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200" 
                aria-label="Follow us on GitHub"
                data-testid="footer-social-github"
              >
                <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">GH</span>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  data-testid="footer-link-features"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  data-testid="footer-link-demo"
                >
                  Demo
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-api">
                  API
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-docs">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-guide">
                  Accessibility Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-support">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-about">
                  About
                </a>
              </li>
              
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-privacy">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="footer-link-terms">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AccessiPDF. All rights reserved. Making the web accessible for everyone.</p>
        </div>
      </div>
    </footer>
  );
}
