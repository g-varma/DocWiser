import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="bg-white py-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Have questions about accessibility or need enterprise solutions? We're here to help.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="fade-in">
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form" data-testid="contact-form">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  data-testid="input-company"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  data-testid="textarea-message"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                data-testid="button-send-message"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="fade-in">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center" data-testid="contact-email">
                    <Mail className="text-primary-500 w-6 h-6 mr-3" aria-hidden="true" />
                    <span className="text-gray-700">support@accessipdf.com</span>
                  </div>
                  <div className="flex items-center" data-testid="contact-phone">
                    <Phone className="text-primary-500 w-6 h-6 mr-3" aria-hidden="true" />
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center" data-testid="contact-location">
                    <MapPin className="text-primary-500 w-6 h-6 mr-3" aria-hidden="true" />
                    <span className="text-gray-700">San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Solutions</h3>
                <p className="text-gray-600 mb-4">Need bulk processing or API access? We offer custom enterprise solutions for organizations of all sizes.</p>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  data-testid="button-learn-more"
                >
                  Learn More
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-200" 
                    aria-label="Follow us on Twitter"
                    data-testid="social-twitter"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">T</span>
                    </div>
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-200" 
                    aria-label="Follow us on LinkedIn"
                    data-testid="social-linkedin"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">in</span>
                    </div>
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-200" 
                    aria-label="Follow us on GitHub"
                    data-testid="social-github"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">GH</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
