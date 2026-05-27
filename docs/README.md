#  AI System for Predicting and Explaining Global Supply Chain Disruptions

##  Overview

Modern global supply chains generate massive operational data every second:

* Port congestion metrics
* Shipment delays
* Weather disruptions
* Logistics bottlenecks
* Container movement fluctuations

Most traditional systems only react **after disruptions occur**.

This project builds a **production-oriented AI platform** capable of:

✅ Predicting future supply chain disruption risk using **Deep Learning (LSTM)**
✅ Processing operational logistics data through a real backend pipeline
✅ Serving live AI predictions through FastAPI APIs
✅ Laying the foundation for future **RAG + LLM-powered operational reasoning**

---

#  Core Problem Statement

Build an intelligent AI system that forecasts global supply chain disruptions using time-series deep learning and explains operational risks using future LLM-powered reasoning systems.

---

#  Key Objectives

This platform aims to simulate how modern enterprise AI systems operate internally at companies like:

* Amazon
* Maersk
* DHL
* FedEx
* Tesla
* Walmart
* SAP Logistics
* Oracle SCM

The system focuses on:

| Capability                | Purpose                               |
| ------------------------- | ------------------------------------- |
| Deep Learning Forecasting | Predict future disruption probability |
| Backend APIs              | Serve live operational predictions    |
| Data Engineering          | Process logistics telemetry           |
| Temporal Modeling         | Learn patterns across time            |
| Production Architecture   | Simulate real enterprise AI systems   |
| Future RAG Integration    | Explain disruptions intelligently     |

---

#  System Architecture

```text id="f8m2wr"
User / Operations Team
            ↓
      FastAPI Backend
            ↓
     PostgreSQL Database
            ↓
    Feature Engineering
            ↓
  Time-Series Sequences
            ↓
      LSTM Forecasting
            ↓
      Prediction API
            ↓
 Future RAG + LLM Layer
```

---

# ⚙️ Tech Stack

##  AI / ML

* TensorFlow / Keras
* LSTM Networks
* NumPy
* Pandas
* Scikit-learn

## ⚙️ Backend

* FastAPI
* SQLAlchemy
* Uvicorn

##  Database

* PostgreSQL(neon)
* pgAdmin

##  DevOps / Infrastructure

* Git
* GitHub
* Virtual Environments
* REST APIs

---

#  Repository Structure

```text id="m5q1wr"
AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analytics.py
│   │   │   ├── dashboard.py
│   │   │   ├── health.py
│   │   │   ├── predict.py
│   │   │   └── upload.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   │
│   │   ├── models/
│   │   │   ├── lstm_model.py
│   │   │   └── port_metrics.py
│   │   │
│   │   └── main.py
│   │
│   ├── scripts/
│   │   └── generate_data.py
│   │
│   ├── requirements.txt
│   └── create_tables.py
│
├── ml/
│   ├── data/
│   ├── models/
│   └── training/
│       ├── load_data.py
│       ├── feature_engineering.py
│       ├── create_sequences.py
│       ├── prepare_training_data.py
│       └── train_lstm.py
│
├── frontend/          # upcoming
├── rag/               # upcoming
├── infra/             # upcoming
└── README.md
```

---

#  Deep Learning Pipeline

## 1️ Data Ingestion

Operational logistics data is:

* Uploaded via CSV
* Processed through FastAPI
* Stored in PostgreSQL

Example operational signals:

* container_volume
* avg_delay_hours
* congestion_level
* weather_score
* disruption_risk

---

## 2️ Feature Engineering

The system generates intelligent temporal features such as:

| Feature                 | Purpose                       |
| ----------------------- | ----------------------------- |
| delay_rolling_mean      | delay trend analysis          |
| congestion_rolling_mean | operational buildup detection |
| weather_rolling_mean    | weather trend tracking        |
| risk_change             | disruption acceleration       |

---

## 3️ Sequence Generation

Sliding windows transform historical operations into time-series learning samples.

Example:

```text id="r4m7vx"
[t1, t2, t3, t4, t5]
            ↓
predict future disruption risk
```

---

## 4️ LSTM Forecasting Model

The platform trains an LSTM network capable of learning:

* congestion escalation
* delay propagation
* weather deterioration patterns
* operational instability

---

## 5️ Live Inference API

The trained model is deployed through FastAPI.

### Example Endpoint

```http id="q8m1wr"
POST /predict
```

### Example Response

```json id="u5q2vx"
{
  "predicted_disruption_risk": 0.6557810306549072
}
```

---

#  Current API Endpoints

| Endpoint             | Purpose                     |
| -------------------- | --------------------------- |
| `/health`            | system health monitoring    |
| `/dashboard`         | operational dashboard data  |
| `/analytics/summary` | analytics aggregation       |
| `/upload/csv`        | logistics data ingestion    |
| `/predict`           | LSTM disruption forecasting |

---

#  Why This Project Matters

Most ML portfolio projects stop at:

```text id="x1m7kp"
notebook → train model
```

This project goes significantly further:

✅ Backend engineering
✅ Database integration
✅ Deep learning pipelines
✅ Time-series forecasting
✅ API deployment
✅ Model serving
✅ Production architecture thinking

This reflects real-world ML systems engineering practices.

---

#  Key Engineering Concepts Implemented

| Domain               | Concepts                           |
| -------------------- | ---------------------------------- |
| ML Engineering       | feature engineering, preprocessing |
| Deep Learning        | LSTM forecasting                   |
| Backend Engineering  | REST APIs, FastAPI                 |
| Database Engineering | PostgreSQL integration             |
| MLOps Foundations    | model persistence, inference       |
| Systems Design       | modular architecture               |

---

# 🚀 Upcoming Features

## 🔄 In Progress

* Frontend Dashboard (Next.js)
* RAG-based operational explanations
* Vector embeddings
* AI operational assistant
* Real-time streaming simulation
* Dockerization
* AWS deployment
* CI/CD pipelines

---

# 🌍 Future Vision

The long-term goal is to evolve this project into a fully operational:

# 🧠 AI-Powered Supply Chain Intelligence Platform

capable of:

* Predicting disruptions
* Explaining root causes
* Retrieving similar incidents
* Supporting operational decision-making
* Providing conversational AI analysis

---

# ⚠️ Important Note

This project is intentionally designed with:

* production-oriented architecture
* modular AI pipelines
* backend-first engineering principles

rather than being a simple notebook demonstration project.

---

# 🧑‍💻 Author

## Talari Jaya Kiran

AI/ML Engineer focused on:

* Machine Learning Systems
* Deep Learning
* MLOps
* AI Infrastructure
* Production AI Platforms

---

# ⭐ Project Status

## ✅ Current Status

| Module                 | Status |
| ---------------------- | ------ |
| Backend APIs           | ✅      |
| PostgreSQL Integration | ✅      |
| Feature Engineering    | ✅      |
| LSTM Forecasting       | ✅      |
| Inference APIs         | ✅      |
| RAG Layer              | ✅   |
| Frontend Dashboard     | ✅     |
| Cloud Deployment       | 🔄     |

---


Makes sense. You’ve spent enough time fighting deployment. If your backend + frontend run correctly locally, that’s enough to keep building.

Let’s make local startup dead simple.

## Start Backend

Open **Terminal 1** in VS Code:

```bash id="y7j0q2"
cd C:\Users\talar\supply-chain-ai-system\backend
```

Activate virtual environment:

### PowerShell:

```bash id="b0n5z9"
.\.venv\Scripts\Activate
```

If activated you’ll see:

```bash id="wjm4c3"
(.venv)
```

Then run backend:

```bash id="q8u1md"
uvicorn app.main:app --reload
```

Backend runs at:

```bash id="yqk5c1"
http://127.0.0.1:8000
```

Swagger docs:

```bash id="g3zt9k"
http://127.0.0.1:8000/docs
```

---

# Start Frontend

Open **Terminal 2**:

```bash id="q0lp7x"
cd C:\Users\talar\supply-chain-ai-system\frontend
```

Run:

```bash id="x6s2pj"
npm install
```

(only if dependencies missing)

Then:

```bash id="l9vn8t"
npm run dev
```

Frontend opens at:

```bash id="z0d5rv"
http://localhost:3000
```

---

# Daily Restart Commands (fast version)

## Backend

```bash id="p5q3tb"
cd backend
.\.venv\Scripts\Activate
uvicorn app.main:app --reload
```

---

## Frontend

```bash id="w2t8fn"
cd frontend
npm run dev
```

---

# If port already busy

Backend:

```bash id="u1m8nk"
Ctrl + C
```

then rerun:

```bash id="q8u1md2"
uvicorn app.main:app --reload
```

Frontend:

```bash id="e5h9pc"
Ctrl + C
npm run dev
```

---

## Final local URLs

Backend API:

```bash id="k6q0ds"
http://127.0.0.1:8000
```

Swagger:

```bash id="t7r2gh"
http://127.0.0.1:8000/docs
```

Frontend dashboard:

```bash id="r4m8vx"
http://localhost:3000
```

---

Your project is already valuable working locally. Deployment can wait.
