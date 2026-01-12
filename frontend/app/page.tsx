"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 mb-8 shadow-elegant">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-800 tracking-wide">
                Powered by 6 Optimized ML Models
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                CardioPredict
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
              Advanced cardiovascular disease risk assessment powered by state-of-the-art machine learning
            </p>
            
            <p className="text-base md:text-lg text-blue-200/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Leveraging 6 optimized ML models trained on 70,000+ patient records for instant, accurate cardiovascular health predictions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/prediction"
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-elegant-lg hover:shadow-2xl flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
              >
                Get Prediction 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/analytics"
                className="px-10 py-5 glass border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
              >
                <TrendingUp className="w-5 h-5" /> View Analytics
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-white/20 pt-12">
              <div className="text-center group">
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  74%+
                </div>
                <div className="text-blue-300 text-sm uppercase tracking-widest font-semibold">
                  Model Accuracy
                </div>
              </div>
              <div className="text-center border-l border-r border-white/20 group">
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  70K+
                </div>
                <div className="text-blue-300 text-sm uppercase tracking-widest font-semibold">
                  Training Records
                </div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  0.805
                </div>
                <div className="text-blue-300 text-sm uppercase tracking-widest font-semibold">
                  ROC-AUC Score
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose CardioPredict AI?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Industry-leading accuracy with enterprise-grade machine learning infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 bg-white rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-elegant-lg transition-all duration-500 transform hover:-translate-y-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-2xl mb-3 text-gray-900">
                Clinical Grade Accuracy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                74%+ accuracy with rigorous validation across 6 different ML algorithms including XGBoost and Random Forest
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-elegant-lg transition-all duration-500 transform hover:-translate-y-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-2xl mb-3 text-gray-900">
                Instant Predictions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sub-second response times with real-time processing powered by FastAPI and optimized inference pipelines
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-elegant-lg transition-all duration-500 transform hover:-translate-y-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-2xl mb-3 text-gray-900">
                Comprehensive Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed performance metrics, ROC curves, confusion matrices, and feature importance analysis
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold text-lg transition-colors"
            >
              Learn more about our technology
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Assess Cardiovascular Risk?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Get instant AI-powered predictions with our advanced machine learning platform
            </p>
            <Link
              href="/prediction"
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Start Assessment
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
