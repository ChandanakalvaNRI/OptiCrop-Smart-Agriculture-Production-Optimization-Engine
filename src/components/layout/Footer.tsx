import { Sprout, Github, Linkedin, Twitter, Mail, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Opti<span className="text-green-400">Crop</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Smart Agricultural Production Optimization Engine. Harnessing the power of machine learning to help farmers make data-driven decisions for optimal crop selection.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Prediction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ML Predictions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Visualization</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Report Generation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Access</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Leaf className="w-4 h-4 text-green-500" />
              <span>Supporting Sustainable Agriculture</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 OptiCrop. All rights reserved. Built with Machine Learning & AI.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
