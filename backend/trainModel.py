import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, roc_curve, auc, precision_score, recall_score, f1_score
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
import joblib
import json

df = pd.read_csv("new_cleaned_cardio_data.csv")
target = "cardio"

# Drop id as it's not a feature
if "id" in df.columns:
    df = df.drop(columns=["id"])

x = df.drop(columns=[target]).select_dtypes(include=[np.number])
y = df[target]

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.1, random_state=42, stratify=y)

scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)

joblib.dump(scaler, "standard_scaler.joblib")

# smote balanceing
smote = SMOTE(random_state=42)
x_train_res,y_train_res = smote.fit_resample(x_train_scaled,y_train)
print("Before:", len(y_train), "After:", len(y_train_res))

# ------------------------------Models-----------------------------
print("Training Logistic Regression with GridSearch...")
logreg_params = {
    'C': [0.1, 1, 10],
    'solver': ['liblinear', 'saga'],
    'penalty': ['l2']
}
logreg = GridSearchCV(LogisticRegression(max_iter=5000, random_state=42), logreg_params, cv=3, n_jobs=-1)
logreg.fit(x_train_res, y_train_res)
print(f"Best Logistic Regression params: {logreg.best_params_}")

logref_pred = logreg.predict(x_test_scaled)
logref_acc = accuracy_score(y_test, logref_pred)

print("Logistic Regression Model Performance:")
print("Accuracy:", logref_acc)
print("--------------------------------------------------")

print("Training Random Forest with Optimized Parameters...")
rf = RandomForestClassifier(
    n_estimators=500,
    max_depth=15,
    min_samples_split=4,
    min_samples_leaf=2,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1
)
rf.fit(x_train_res, y_train_res)

rf_pred = rf.predict(x_test_scaled)
rf_acc = accuracy_score(y_test, rf_pred)

print("Random Forest Model Performance:")
print("Accuracy:", rf_acc)
print("--------------------------------------------------")

print("Training Decision Tree...")
dt = DecisionTreeClassifier(max_depth=10, min_samples_split=10, random_state=42)
dt.fit(x_train_res, y_train_res)

dt_pred = dt.predict(x_test_scaled)
dt_acc = accuracy_score(y_test, dt_pred)

print("Decision Tree Model Performance:")
print("Accuracy:", dt_acc)
print("--------------------------------------------------")

print("Training SVC (Support Vector Classifier)...")
svc = SVC(kernel='rbf', C=1.0, gamma='scale', probability=True, random_state=42)
svc.fit(x_train_res, y_train_res)

svc_pred = svc.predict(x_test_scaled)
svc_acc = accuracy_score(y_test, svc_pred)

print("SVC Model Performance:")
print("Accuracy:", svc_acc)
print("--------------------------------------------------")

print("Training KNN (K-Nearest Neighbors)...")
knn = KNeighborsClassifier(n_neighbors=11, weights='distance', metric='minkowski')
knn.fit(x_train_res, y_train_res)

knn_pred = knn.predict(x_test_scaled)
knn_acc = accuracy_score(y_test, knn_pred)

print("KNN Model Performance:")
print("Accuracy:", knn_acc)
print("--------------------------------------------------")

print("Training XGBoost with Enhanced Parameters...")
xgb = XGBClassifier(
    n_estimators=500,
    max_depth=10,
    learning_rate=0.05,
    subsample=0.9,
    colsample_bytree=0.9,
    gamma=0.1,
    reg_alpha=0.1,
    reg_lambda=1.0,
    objective="binary:logistic",
    eval_metric="logloss",
    random_state=42
)

xgb.fit(x_train_res, y_train_res)

xgb_pred = xgb.predict(x_test_scaled)
xgb_probs = xgb.predict_proba(x_test_scaled)[:, 1]
acc_xgb = accuracy_score(y_test, xgb_pred)

print("XGBoost Model Performance:")
print("Accuracy:", acc_xgb)

cm = confusion_matrix(y_test, xgb_pred)
tn, fp, fn, tp = cm.ravel()

fpr, tpr, _ = roc_curve(y_test, xgb_probs)
roc_auc = auc(fpr, tpr)

indices = np.linspace(0, len(fpr) - 1, 20).astype(int)
roc_data = [{"x": float(fpr[i]), "y": float(tpr[i])} for i in indices]

precision = precision_score(y_test, xgb_pred)
recall = recall_score(y_test, xgb_pred)
f1 = f1_score(y_test, xgb_pred)

feature_names = x.columns.tolist()
importances = xgb.feature_importances_
feature_importance_data = [
    {"name": name, "value": float(imp)} 
    for name, imp in zip(feature_names, importances)
]
feature_importance_data.sort(key=lambda x: x["value"], reverse=True)

metrics = {
    "Logistic Regression": logref_acc,
    "Random Forest": rf_acc,
    "Decision Tree": dt_acc,
    "SVC": svc_acc,
    "KNN": knn_acc,
    "XGBoost": acc_xgb
}

detailed_metrics = {
    "accuracy": float(acc_xgb),
    "precision": float(precision),
    "recall": float(recall),
    "f1_score": float(f1),
    "roc_auc": float(roc_auc),
    "confusion_matrix": {
        "tn": int(tn),
        "fp": int(fp),
        "fn": int(fn),
        "tp": int(tp)
    },
    "roc_curve": roc_data,
    "feature_importance": feature_importance_data,
    "model_comparison": metrics
}

with open("detailed_metrics.json", "w") as f:
    json.dump(detailed_metrics, f, indent=2)

with open("model_metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

joblib.dump(logreg, "models/logistic_regression_model.joblib")
joblib.dump(rf, "models/random_forest_model.joblib")
joblib.dump(dt, "models/decision_tree_model.joblib")
joblib.dump(svc, "models/svc_model.joblib")
joblib.dump(knn, "models/knn_model.joblib")
joblib.dump(xgb, "models/XGBClassifier_model.joblib")

print("\n=== All Models Trained Successfully ===")
print(f"Models saved to ./models/ directory")
print(f"Metrics saved to model_metrics.json and detailed_metrics.json")
print("\n=== Model Comparison ===")
for model_name, acc in sorted(metrics.items(), key=lambda x: x[1], reverse=True):
    print(f"{model_name}: {acc*100:.2f}%")


