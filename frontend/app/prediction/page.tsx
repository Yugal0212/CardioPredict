"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Activity,
  Heart,
  Shield,
  Zap,
  Database,
  Cpu,
  BarChart as BarChartIcon,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    gender: "Female",
    age: 50,
    height: 165,
    weight: 70.0,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: "Normal",
    glucose: "Normal",
    smoke: "No",
    alco: "No",
    active: "Active",
    model_name: "XGBoost",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<any[]>([]);
  const [detailedMetrics, setDetailedMetrics] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/metrics`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          const formattedMetrics = Object.keys(data).map((key) => ({
            name: key,
            accuracy: parseFloat((data[key] * 100).toFixed(1)),
          }));
          setMetrics(formattedMetrics);
        }
      })
      .catch((err) => console.error("Failed to fetch metrics", err));

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/detailed_metrics`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setDetailedMetrics(data);
        }
      })
      .catch((err) => console.error("Failed to fetch detailed metrics", err));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    // Map inputs to API expected format
    const payload = {
      gender: formData.gender === "Female" ? 1 : 2,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      ap_hi: Number(formData.ap_hi),
      ap_lo: Number(formData.ap_lo),
      cholesterol:
        formData.cholesterol === "Low"
          ? 1
          : formData.cholesterol === "Normal"
          ? 2
          : 3,
      glucose:
        formData.glucose === "Low" ? 1 : formData.glucose === "Normal" ? 2 : 3,
      smoke: formData.smoke === "No" ? 0 : 1,
      alco: formData.alco === "No" ? 0 : 1,
      active: formData.active === "Sedentary" ? 0 : 1,
      model_name: formData.model_name,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollToPrediction = () => {
    const element = document.getElementById("prediction-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mock data for charts where backend data is missing
  const rocData = detailedMetrics?.roc_curve || [
    { x: 0, y: 0 },
    { x: 0.1, y: 0.4 },
    { x: 0.2, y: 0.6 },
    { x: 0.3, y: 0.7 },
    { x: 0.4, y: 0.75 },
    { x: 0.5, y: 0.8 },
    { x: 0.6, y: 0.85 },
    { x: 0.7, y: 0.9 },
    { x: 0.8, y: 0.95 },
    { x: 0.9, y: 0.98 },
    { x: 1, y: 1 },
  ];

  const featureImportance = detailedMetrics?.feature_importance
    ? detailedMetrics.feature_importance.map((item: any) => ({
        name: item.name,
        value: parseFloat((item.value * 100).toFixed(1)),
      }))
    : [
        { name: "Systolic BP", value: 24.7 },
        { name: "Diastolic BP", value: 14 },
        { name: "Age", value: 14 },
        { name: "Cholesterol", value: 12 },
        { name: "Glucose", value: 10 },
        { name: "Weight", value: 8 },
        { name: "Active", value: 7 },
        { name: "Smoke", value: 5 },
        { name: "Alcohol", value: 3 },
        { name: "Gender", value: 2 },
        { name: "Height", value: 0.3 },
      ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Cardiovascular Disease Prediction
            </h1>
            <p className="text-lg text-blue-100">
              Enter your health metrics for AI-powered risk assessment
            </p>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-amber-50 border-b border-amber-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-4 max-w-4xl mx-auto">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 mb-1">
                Medical Disclaimer
              </h3>
              <p className="text-amber-700 text-sm mb-2">
                Important: This AI model is designed for educational and
                research purposes only. It should NOT be used as a substitute
                for professional medical advice, diagnosis, or treatment.
              </p>
              <ul className="text-amber-700 text-sm list-disc list-inside space-y-1">
                <li>Always seek the advice of qualified healthcare providers</li>
                <li>
                  Never disregard professional medical advice based on this
                  prediction
                </li>
                <li>This tool is part of an ML/DL academic project</li>
                <li>Results should be validated by medical professionals</li>
              </ul>
              <p className="text-amber-700 text-xs mt-2 italic">
                By using this tool, you acknowledge that you understand and
                accept these limitations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prediction Form Section */}
      <section id="prediction-form" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Get Your Prediction
              </h2>
              <p className="text-gray-600 text-lg">
                Enter your health metrics for instant AI-powered cardiovascular risk assessment
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-elegant-lg overflow-hidden border-2 border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow"></div>
                <Heart className="w-16 h-16 mx-auto mb-4 relative z-10" />
                <h3 className="text-2xl font-black relative z-10">Health Assessment Form</h3>
                <p className="text-blue-100 mt-2 relative z-10">
                  All fields are required for accurate prediction
                </p>
              </div>
              <div className="p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gender */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    >
                      <option>Female</option>
                      <option>Male</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Age (years)
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="10"
                      max="100"
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    />
                  </div>

                  {/* Height */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      min="50"
                      max="250"
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    />
                  </div>

                  {/* Weight */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      min="30"
                      max="200"
                      step="0.1"
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    />
                  </div>

                  {/* Systolic BP */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Systolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="ap_hi"
                      value={formData.ap_hi}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    />
                  </div>

                  {/* Diastolic BP */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      Diastolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="ap_lo"
                      value={formData.ap_lo}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    />
                  </div>

                  {/* Cholesterol */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      Cholesterol
                    </label>
                    <select
                      name="cholesterol"
                      value={formData.cholesterol}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    >
                      <option>Low</option>
                      <option>Normal</option>
                      <option>High</option>
                    </select>
                  </div>

                  {/* Glucose */}
                  <div className="form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Glucose
                    </label>
                    <select
                      name="glucose"
                      value={formData.glucose}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    >
                      <option>Low</option>
                      <option>Normal</option>
                      <option>High</option>
                    </select>
                  </div>

                  {/* Smoke */}
                  <div className="form-group col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                      Smoker?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="smoke"
                          value="No"
                          checked={formData.smoke === "No"}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-green-500 peer-checked:bg-green-50 hover:border-gray-300 transition-all text-center font-semibold text-gray-700 peer-checked:text-green-700">
                          ✓ No
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="smoke"
                          value="Yes"
                          checked={formData.smoke === "Yes"}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-gray-300 transition-all text-center font-semibold text-gray-700 peer-checked:text-red-700">
                          ✗ Yes
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Alcohol */}
                  <div className="form-group col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Alcohol Intake?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="alco"
                          value="No"
                          checked={formData.alco === "No"}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-green-500 peer-checked:bg-green-50 hover:border-gray-300 transition-all text-center font-semibold text-gray-700 peer-checked:text-green-700">
                          ✓ No
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="alco"
                          value="Yes"
                          checked={formData.alco === "Yes"}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-gray-300 transition-all text-center font-semibold text-gray-700 peer-checked:text-red-700">
                          ✗ Yes
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Active */}
                  <div className="form-group col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Physical Activity Level?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="active"
                          value="Sedentary"
                          checked={formData.active === "Sedentary"}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-gray-300 transition-all text-center font-semibold text-gray-700 peer-checked:text-orange-700">
                          🪑 Sedentary
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="active"
                          value="Active"
                          checked={formData.active === "Active"}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-green-500 peer-checked:bg-green-50 hover:border-gray-300 transition-all text-center font-semibold text-gray-700 peer-checked:text-green-700">
                          🏃 Active
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Model Selection */}
                  <div className="col-span-1 md:col-span-2 form-group">
                    <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                      Select AI Model
                    </label>
                    <select
                      name="model_name"
                      value={formData.model_name}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3.5 text-gray-900 bg-gray-50 font-medium hover:border-gray-300 transition-all"
                    >
                      <option>XGBoost</option>
                      <option>Random Forest</option>
                      <option>Logistic Regression</option>
                      <option>SVC</option>
                      <option>KNN</option>
                      <option>Decision Tree</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-5 px-6 border-2 border-transparent rounded-2xl shadow-elegant-lg text-lg font-black text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-lg">Analyzing Your Health Data...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Activity className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span>Analyze Cardiovascular Risk</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {result && (
                <div
                  className={`mt-8 p-8 rounded-xl text-center border-2 animate-fade-in-up shadow-2xl ${
                    result.prediction === 1
                      ? "bg-gradient-to-br from-red-50 to-red-100 border-red-300 text-red-900"
                      : "bg-gradient-to-br from-green-50 to-green-100 border-green-300 text-green-900"
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    {result.prediction === 1 ? (
                      <div className="w-20 h-20 bg-red-200 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg">
                        <Activity className="w-10 h-10 text-red-700" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg">
                        <Heart className="w-10 h-10 text-green-700" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-4xl font-bold mb-3">
                    Result: {result.risk} Risk
                  </h3>
                  <div className="mb-4">
                    <p className="text-2xl font-semibold">
                      Probability: {(result.probability * 100).toFixed(1)}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          result.prediction === 1 ? "bg-red-600" : "bg-green-600"
                        }`}
                        style={{ width: `${(result.probability * 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="mt-4 text-base opacity-90 max-w-md mx-auto leading-relaxed">
                    {result.prediction === 1
                      ? "⚠️ The model suggests a higher likelihood of cardiovascular issues. Please consult a healthcare professional for a comprehensive evaluation."
                      : "✓ The model suggests a lower likelihood of cardiovascular issues. Continue maintaining a healthy lifestyle with regular check-ups!"}
                  </p>
                  <p className="mt-3 text-sm opacity-75 italic">
                    Model Used: <span className="font-semibold">{formData.model_name}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Performance Metrics
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Model Analytics & Insights. Comprehensive visualization of model
              performance, training metrics, and feature importance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Accuracy Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <BarChartIcon className="w-5 h-5 text-blue-600" /> Model
                Accuracy Comparison
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metrics}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Bar
                      dataKey="accuracy"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      name="Accuracy (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ROC Curve */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" /> ROC Curve (AUC =
                0.805)
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={rocData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="x"
                      type="number"
                      domain={[0, 1]}
                      label={{
                        value: "False Positive Rate",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      dataKey="y"
                      type="number"
                      domain={[0, 1]}
                      label={{
                        value: "True Positive Rate",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="x"
                      stroke="#9ca3af"
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Confusion Matrix */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" /> Confusion Matrix
              </h3>
              <div className="grid grid-cols-2 gap-4 h-80">
                <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-green-100">
                  <div className="text-3xl font-bold text-green-700">
                    {detailedMetrics
                      ? detailedMetrics.confusion_matrix.tn
                      : "5454"}
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    True Negative
                  </div>
                  <div className="text-xs text-green-600">
                    (Correct: No Disease)
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-red-100">
                  <div className="text-3xl font-bold text-red-700">
                    {detailedMetrics
                      ? detailedMetrics.confusion_matrix.fp
                      : "1550"}
                  </div>
                  <div className="text-sm font-medium text-red-800">
                    False Positive
                  </div>
                  <div className="text-xs text-red-600">
                    (Error: Predicted Disease)
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-red-100">
                  <div className="text-3xl font-bold text-red-700">
                    {detailedMetrics
                      ? detailedMetrics.confusion_matrix.fn
                      : "2093"}
                  </div>
                  <div className="text-sm font-medium text-red-800">
                    False Negative
                  </div>
                  <div className="text-xs text-red-600">
                    (Error: Missed Disease)
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-green-100">
                  <div className="text-3xl font-bold text-green-700">
                    {detailedMetrics
                      ? detailedMetrics.confusion_matrix.tp
                      : "4903"}
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    True Positive
                  </div>
                  <div className="text-xs text-green-600">
                    (Correct: Disease)
                  </div>
                </div>
              </div>
              <div className="text-center mt-4 text-sm text-gray-500">
                Total Predictions:{" "}
                {detailedMetrics
                  ? detailedMetrics.confusion_matrix.tn +
                    detailedMetrics.confusion_matrix.fp +
                    detailedMetrics.confusion_matrix.fn +
                    detailedMetrics.confusion_matrix.tp
                  : "14,000"}{" "}
                | Accuracy:{" "}
                {detailedMetrics
                  ? (detailedMetrics.accuracy * 100).toFixed(2) + "%"
                  : "73.97%"}
              </div>
            </div>

            {/* Feature Importance */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <BarChartIcon className="w-5 h-5 text-blue-600" /> Feature
                Importance
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={featureImportance}
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                      name="Importance (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">
                {detailedMetrics
                  ? (detailedMetrics.accuracy * 100).toFixed(2) + "%"
                  : "73.97%"}
              </div>
              <div className="text-sm text-blue-600 font-medium">Accuracy</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-green-700 mb-1">
                {detailedMetrics
                  ? (detailedMetrics.precision * 100).toFixed(2) + "%"
                  : "75.98%"}
              </div>
              <div className="text-sm text-green-600 font-medium">
                Precision
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-700 mb-1">
                {detailedMetrics
                  ? (detailedMetrics.recall * 100).toFixed(2) + "%"
                  : "70.08%"}
              </div>
              <div className="text-sm text-purple-600 font-medium">Recall</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-orange-700 mb-1">
                {detailedMetrics
                  ? detailedMetrics.f1_score.toFixed(2)
                  : "0.73"}
              </div>
              <div className="text-sm text-orange-600 font-medium">
                F1-Score
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
