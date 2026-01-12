"use client";

import Link from "next/link";
import { Heart, Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white">CardioPredict AI</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Advanced cardiovascular disease risk assessment powered by machine learning. 
              Helping healthcare professionals make informed decisions with AI-driven insights.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/prediction" className="hover:text-blue-400 transition-colors">Prediction</Link></li>
              <li><Link href="/analytics" className="hover:text-blue-400 transition-colors">Analytics</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/documentation" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 CardioPredict AI. Educational Project - For Research Purposes Only.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
