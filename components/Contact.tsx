import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Download } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Contact: React.FC = () => {
  const handleContactClick = (method: string) => {
    trackEvent('contact_click', 'Contact', method);
  };

  const handleDownloadCV = () => {
    trackEvent('download_cv', 'Engagement', 'Contact Section');
    window.alert('CV PDF would be downloaded here in a real deployment');
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-slate-400 mb-12 text-lg">
            Available for Third-Party Risk Management (TPRM) and Supplier Assurance opportunities.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
            <div className="flex flex-col items-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors w-full md:w-64">
              <div className="p-4 bg-slate-900 rounded-full mb-4 text-primary-500">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a 
                href={`mailto:${CONTACT_INFO.email}`} 
                onClick={() => handleContactClick('email')}
                className="text-slate-300 hover:text-white transition-colors text-sm break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
             <button 
               onClick={handleDownloadCV}
               className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
             >
                <Download className="w-5 h-5" />
                Download CV
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;