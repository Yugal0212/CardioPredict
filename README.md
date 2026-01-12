# CardioPredict AI

Advanced cardiovascular disease risk assessment powered by 6 optimized ML models.

## 🚀 Features

- **6 ML Models**: XGBoost, Random Forest, SVC, KNN, Logistic Regression, Decision Tree
- **74%+ Accuracy**: Trained on 70,000+ patient records
- **Professional UI**: Next.js with Tailwind CSS, animations, and responsive design
- **Multi-page Routing**: Home, Prediction, Analytics, About, Documentation
- **Real-time Predictions**: FastAPI backend with instant results

## 📦 Tech Stack

**Frontend:**
- Next.js 16.1.1 with Turbopack
- React, TypeScript
- Tailwind CSS
- Recharts for visualizations
- Lucide React icons

**Backend:**
- FastAPI
- Python 3.12
- scikit-learn 1.8.0
- XGBoost 3.1.2
- pandas, numpy, joblib

## 🛠️ Installation

### Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deploy to Vercel

### Quick Deploy
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Manual Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📊 Model Performance

| Model | Accuracy |
|-------|----------|
| XGBoost | 74.2% |
| Random Forest | 73.8% |
| SVC | 73.5% |
| KNN | 72.9% |
| Logistic Regression | 72.4% |
| Decision Tree | 68.1% |

## ⚠️ Medical Disclaimer

This tool is for **educational purposes only**. Not a substitute for professional medical advice.

## 📄 License

MIT License - Academic Project

## 👨‍💻 Author

Created as part of ML/DL academic project - Phase 5: Backend & Deployment
