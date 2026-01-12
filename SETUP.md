# 🚀 Quick Setup Guide

## Step 1: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Step 2: Train Models with New Improvements

```bash
cd backend
python trainModel.py
```

Expected output:
- Training 6 models with optimized hyperparameters
- Generating metrics and saving models
- **This may take 5-10 minutes**

## Step 3: Start Backend Server

```bash
cd backend
uvicorn main:app --reload
```

Backend will run at: **http://localhost:8000**

## Step 4: Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Step 5: Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run at: **http://localhost:3000**

## 📝 Verification

1. Open http://localhost:3000
2. You should see:
   - ✨ New animated hero section
   - 📊 Model comparison with 6 models
   - 🎨 Enhanced form design
   - 💫 Smooth animations

3. Test prediction:
   - Fill in the form
   - Select any of the 6 models
   - Click "Analyze Risk"
   - See enhanced result card with animations

## 🎯 What's Different?

### Backend
- ✅ 6 models (added SVC, KNN)
- ✅ Optimized hyperparameters
- ✅ GridSearchCV for Logistic Regression
- ✅ Better accuracy (expected 74-76% for XGBoost)

### Frontend
- ✅ Animated gradients
- ✅ Model comparison section
- ✅ Enhanced result cards
- ✅ Loading animations
- ✅ Smooth transitions
- ✅ 6 model options

## ⚠️ Important

Make sure to **retrain models** (Step 2) before running the application to see the improvements!

## 🐛 Troubleshooting

**Backend port already in use?**
```bash
uvicorn main:app --reload --port 8001
# Update frontend/.env.local accordingly
```

**Frontend port in use?**
```bash
npm run dev -- -p 3001
```

**Models not loading?**
- Verify `backend/models/` directory has 6 .joblib files
- Check `backend/model_metrics.json` exists
- Retrain if needed: `python trainModel.py`
