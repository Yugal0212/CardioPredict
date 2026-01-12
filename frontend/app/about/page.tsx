"use client";

import { Shield, Users, Target, Award, Heart, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              About CardioPredict AI
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Advancing cardiovascular healthcare through artificial intelligence and machine learning innovation
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                To democratize access to advanced cardiovascular disease prediction by leveraging state-of-the-art machine learning algorithms, 
                enabling early detection and prevention through data-driven insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3 text-gray-900">Accuracy First</h3>
                <p className="text-gray-600">
                  74%+ accuracy through ensemble of 6 optimized ML models
                </p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl border-2 border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3 text-gray-900">Real-Time</h3>
                <p className="text-gray-600">
                  Instant predictions with sub-second response times
                </p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border-2 border-indigo-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3 text-gray-900">Research-Backed</h3>
                <p className="text-gray-600">
                  Trained on 70,000+ validated patient records
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* Disclaimer */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl border-2 border-amber-200 shadow-elegant">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black text-amber-900 mb-4">
                  Important Medical Disclaimer
                </h3>
                <p className="text-amber-800 mb-4 leading-relaxed">
                  CardioPredict AI is an academic research project designed for educational and demonstration purposes only. 
                  This platform should NOT be used as a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <ul className="space-y-2 text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Always seek the advice of qualified healthcare providers with any questions regarding medical conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Never disregard professional medical advice or delay seeking it based on predictions from this tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>All predictions should be validated by medical professionals before making any health decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>This is a machine learning research project, not a certified medical device</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
