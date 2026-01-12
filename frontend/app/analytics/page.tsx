"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Activity, BarChart as BarChartIcon, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [detailedMetrics, setDetailedMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/metrics`).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/detailed_metrics`).then((res) => res.json()),
    ])
      .then(([metricsData, detailedData]) => {
        if (metricsData && !metricsData.error) {
          const formattedMetrics = Object.keys(metricsData).map((key) => ({
            name: key,
            accuracy: parseFloat((metricsData[key] * 100).toFixed(1)),
          }));
          setMetrics(formattedMetrics);
        }
        if (detailedData && !detailedData.error) {
          setDetailedMetrics(detailedData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch metrics", err);
        setLoading(false);
      });
  }, []);

  const rocData = detailedMetrics?.roc_curve || [];
  const featureImportance = detailedMetrics?.feature_importance || [];

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading Analytics...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-900" />
              <span className="text-sm font-semibold text-gray-800">
                Performance Analytics
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Model Analytics & Insights
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive visualization of model performance metrics, training data, and feature importance
            </p>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Accuracy Chart */}
            <div className="bg-white p-8 rounded-2xl shadow-elegant border-2 border-gray-100">
              <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                <BarChartIcon className="w-6 h-6 text-blue-600" />
                Model Accuracy Comparison
              </h3>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        border: "2px solid #e5e7eb",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar
                      dataKey="accuracy"
                      fill="url(#colorGradient)"
                      radius={[8, 8, 0, 0]}
                      name="Accuracy (%)"
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ROC Curve */}
            <div className="bg-white p-8 rounded-2xl shadow-elegant border-2 border-gray-100">
              <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                <Activity className="w-6 h-6 text-purple-600" />
                ROC Curve (AUC = {detailedMetrics?.roc_auc.toFixed(3) || "0.805"})
              </h3>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rocData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="x"
                      type="number"
                      domain={[0, 1]}
                      label={{ value: "False Positive Rate", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      dataKey="y"
                      type="number"
                      domain={[0, 1]}
                      label={{ value: "True Positive Rate", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="x" stroke="#9ca3af" strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Confusion Matrix */}
            <div className="bg-white p-8 rounded-2xl shadow-elegant border-2 border-gray-100">
              <h3 className="text-2xl font-black mb-6 text-gray-900">
                Confusion Matrix
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border-2 border-green-200 text-center">
                  <div className="text-5xl font-black text-green-700 mb-2">
                    {detailedMetrics?.confusion_matrix.tn || "5454"}
                  </div>
                  <div className="text-sm font-bold text-green-800 mb-1">True Negative</div>
                  <div className="text-xs text-green-600">(Correct: No Disease)</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-rose-100 p-8 rounded-2xl border-2 border-red-200 text-center">
                  <div className="text-5xl font-black text-red-700 mb-2">
                    {detailedMetrics?.confusion_matrix.fp || "1550"}
                  </div>
                  <div className="text-sm font-bold text-red-800 mb-1">False Positive</div>
                  <div className="text-xs text-red-600">(Error: Predicted Disease)</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-8 rounded-2xl border-2 border-orange-200 text-center">
                  <div className="text-5xl font-black text-orange-700 mb-2">
                    {detailedMetrics?.confusion_matrix.fn || "2093"}
                  </div>
                  <div className="text-sm font-bold text-orange-800 mb-1">False Negative</div>
                  <div className="text-xs text-orange-600">(Error: Missed Disease)</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border-2 border-blue-200 text-center">
                  <div className="text-5xl font-black text-blue-700 mb-2">
                    {detailedMetrics?.confusion_matrix.tp || "4903"}
                  </div>
                  <div className="text-sm font-bold text-blue-800 mb-1">True Positive</div>
                  <div className="text-xs text-blue-600">(Correct: Disease)</div>
                </div>
              </div>
            </div>

            {/* Feature Importance */}
            <div className="bg-white p-8 rounded-2xl shadow-elegant border-2 border-gray-100">
              <h3 className="text-2xl font-black mb-6 text-gray-900">
                Feature Importance
              </h3>
              <div className="space-y-4">
                {featureImportance.slice(0, 10).map((feature: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{feature.name}</span>
                      <span className="text-sm font-bold text-blue-600">{(feature.value * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${(feature.value * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-center shadow-elegant-lg">
              <div className="text-4xl font-black text-white mb-2">
                {detailedMetrics ? (detailedMetrics.accuracy * 100).toFixed(2) + "%" : "73.97%"}
              </div>
              <div className="text-sm text-blue-100 font-bold uppercase tracking-wide">Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-center shadow-elegant-lg">
              <div className="text-4xl font-black text-white mb-2">
                {detailedMetrics ? (detailedMetrics.precision * 100).toFixed(2) + "%" : "75.98%"}
              </div>
              <div className="text-sm text-green-100 font-bold uppercase tracking-wide">Precision</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-8 rounded-2xl text-center shadow-elegant-lg">
              <div className="text-4xl font-black text-white mb-2">
                {detailedMetrics ? (detailedMetrics.recall * 100).toFixed(2) + "%" : "70.08%"}
              </div>
              <div className="text-sm text-purple-100 font-bold uppercase tracking-wide">Recall</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 rounded-2xl text-center shadow-elegant-lg">
              <div className="text-4xl font-black text-white mb-2">
                {detailedMetrics ? detailedMetrics.f1_score.toFixed(3) : "0.730"}
              </div>
              <div className="text-sm text-orange-100 font-bold uppercase tracking-wide">F1-Score</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
