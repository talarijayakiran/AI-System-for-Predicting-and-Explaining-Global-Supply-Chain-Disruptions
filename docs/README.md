# AI System for Predicting and Explaining Global Supply Chain Disruptions

> **Predict. Explain. Retrieve. Monitor.**

An end-to-end AI engineering system that combines machine-learning-based disruption risk prediction, retrieval-augmented operational intelligence, real-time monitoring, analytics, and a deployed web application.
[![Live Application](https://img.shields.io/badge/🚀%20Live%20Application-Open%20App-black?style=for-the-badge)](https://global-supply-chain-ai.vercel.app)
[![60-Second Demo](https://img.shields.io/badge/▶%20Watch%2060--Second%20Demo-f43f5e?style=for-the-badge)](https://drive.google.com/file/d/1XsjibyN2-desBpQIstYaWOYqbe2QDWO5/view?usp=drive_link)
[![Source Code](https://img.shields.io/badge/Source%20Code-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/talarijayakiran/AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions)

##  Live Application

**Live Demo:** https://global-supply-chain-ai.vercel.app

**Repository:** https://github.com/talarijayakiran/AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions

---

## 🎥 60-Second Product Demo

[![▶ Watch 60-Second Demo](https://img.shields.io/badge/%E2%96%B6%20Watch%2060--Second%20Demo-f43f5e?style=for-the-badge)](https://drive.google.com/file/d/1XsjibyN2-desBpQIstYaWOYqbe2QDWO5/view?usp=drive_link)

> A 60-second walkthrough of the deployed AI supply-chain platform,
> covering disruption-risk prediction, RAG-powered operational
> intelligence, historical analysis, and real-time monitoring.

## 💡 What Problem Does This Solve?

Global supply chains are affected by interacting operational conditions such as port congestion, shipment delays, weather conditions, and other disruption signals. The difficult part is not producing a single risk score; it is turning that score into operationally useful intelligence.

This system combines:

1. **Predictive ML** — estimate disruption risk from operational features.
2. **Historical retrieval** — retrieve semantically relevant past incidents.
3. **Generative AI** — turn retrieved evidence into concise operational explanations.
4. **Real-time monitoring** — stream changing operational metrics to the dashboard.
5. **Analytics** — expose historical and operational views for investigation.
6. **Production backend** — serve the system through FastAPI, PostgreSQL, Docker, and cloud infrastructure.

The objective is an integrated AI application rather than an isolated notebook or model endpoint.

---

# 🏗️ System Architecture

```text
                              ┌─────────────────────────┐
                              │        User / HR        │
                              │      / Recruiter        │
                              └────────────┬────────────┘
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │    Next.js Frontend     │
                              │         Vercel          │
                              │                         │
                              │ Dashboard • Analytics  │
                              │ RAG • Predictions      │
                              │ Live Monitoring        │
                              └────────────┬────────────┘
                                           │
                              HTTPS / REST │ WSS
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │    Cloudflare Tunnel    │
                              │  Public backend routing │
                              └────────────┬────────────┘
                                           │
                                           ▼
                 ┌─────────────────────────────────────────────────┐
                 │                    AWS EC2                      │
                 │                                                 │
                 │  ┌───────────────────────────────────────────┐  │
                 │  │            Dockerized FastAPI              │  │
                 │  │                                           │  │
                 │  │ Prediction │ RAG │ Copilot │ Analytics   │  │
                 │  │ Upload     │ Live │ Alerts  │ Timeline    │  │
                 │  │ Historical Risk │ WebSocket │ Health     │  │
                 │  └──────────────┬────────────────────────────┘  │
                 │                 │                               │
                 │       ┌─────────┴──────────┐                    │
                 │       │                    │                    │
                 │       ▼                    ▼                    │
                 │ ┌───────────────┐  ┌─────────────────────────┐ │
                 │ │  PostgreSQL   │  │       AI / RAG Layer    │ │
                 │ │               │  │                         │ │
                 │ │ SQLAlchemy    │  │ TensorFlow / ML model   │ │
                 │ │ Persistent DB │  │ Sentence Transformers  │ │
                 │ └───────────────┘  │ Cosine similarity       │ │
                 │                    │ Gemini generation       │ │
                 │                    └─────────────────────────┘ │
                 └─────────────────────────────────────────────────┘
```

### Intelligence Flow

```text
User Question / Operational Request
                │
                ▼
        Next.js Application
                │
                ▼
          FastAPI Router
                │
        ┌───────┴────────┐
        │                │
        ▼                ▼
   ML Prediction     RAG Retrieval
        │                │
        │        Query Embedding
        │                │
        │                ▼
        │       Semantic Similarity
        │                │
        │                ▼
        │      Top Historical Incidents
        │                │
        └────────┬───────┘
                 ▼
          Gemini Generation
                 │
                 ▼
      Operational Intelligence
                 │
                 ▼
           Frontend Dashboard
```

---

# 🧠 Core AI Capabilities

## 1. Disruption Risk Prediction

The backend exposes a prediction service backed by a trained deep-learning model and preprocessing scaler.

The current inference path:

- Builds a five-timestep operational sequence.
- Uses eight operational features per timestep.
- Applies the trained scaler.
- Runs the TensorFlow/Keras model.
- Returns a numeric disruption-risk value.

This demonstrates **model integration into an API-serving application**, not only model training.

---

## 2. Retrieval-Augmented Generation

The RAG pipeline combines semantic retrieval with Gemini generation.

```text
User Query
    │
    ▼
SentenceTransformer
    │
    ▼
Query Embedding
    │
    ▼
Cosine Similarity
    │
    ▼
Top-K Historical Incidents
    │
    ▼
Retrieved Operational Context
    │
    ├──────────────► Current Predicted Risk
    │
    ▼
Gemini Generation
    │
    ▼
Risk Context
Historical Evidence
Operational Insight
```

### RAG design

- Embedding model: `all-MiniLM-L6-v2`
- Historical incident data stored as CSV
- Precomputed embeddings stored as NumPy arrays
- Semantic retrieval using cosine similarity
- Top-3 historical incidents retrieved per query
- Gemini used for final operational explanation
- Prompt instructs the model not to invent unsupported facts
- Historical evidence is distinguished from current events

The core principle is:

**retrieve evidence first → generate the operational answer from that evidence.**

---

# 📡 Real-Time Operational Monitoring

The platform includes live operational data and a WebSocket streaming path.

```text
FastAPI Live Data Source
          │
          ▼
   WebSocket Endpoint
          │
          │ continuous updates
          ▼
     Next.js Client
          │
          ▼
Live Dashboard / Risk Views
```

Live operational records contain:

- Port
- Disruption risk
- Delay hours
- Congestion
- Timestamp

The backend also exposes HTTP live-metrics and operational monitoring endpoints.

> The live feed is application/demo operational data. It is not presented as a guaranteed external real-time shipping feed.

---

# 📊 Operational Intelligence Features

| Capability | Purpose |
|---|---|
| Health | Service health verification |
| Dashboard | Operational dashboard data |
| Analytics | Aggregated operational analytics |
| Upload | Data upload workflow |
| Prediction | Disruption-risk inference |
| Explain | Prediction/explanation workflow |
| RAG Query | Historical evidence + generated insight |
| Copilot | Operational assistant workflow |
| Live Metrics | Current operational signals |
| Live Alerts | Operational alert data |
| Event Timeline | Historical/event timeline |
| WebSocket Stream | Continuous live updates |
| Historical Risk | Historical risk analysis |

---

# 🛠️ Technology Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Axios
- Recharts
- Tailwind CSS
- Lucide React

### Backend

- Python 3.13
- FastAPI
- Uvicorn
- SQLAlchemy
- PostgreSQL
- psycopg2
- REST APIs
- WebSockets

### Machine Learning / Deep Learning

- TensorFlow 2.21
- NumPy
- Pandas
- Scikit-learn
- Joblib
- Feature scaling / preprocessing

### Generative AI / RAG

- Google Gemini API
- `google-genai`
- Sentence Transformers
- `all-MiniLM-L6-v2`
- NumPy embedding storage
- Cosine similarity retrieval

### DevOps / Cloud

- Docker
- Docker Compose
- AWS EC2
- Cloudflare Tunnel
- Vercel
- Git / GitHub

---

# 🗂️ Repository Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/              # API routers
│   │   ├── core/             # Configuration / database
│   │   ├── models/           # Model integration
│   │   └── services/         # Business and RAG services
│   ├── create_tables.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/                  # Next.js application
│   ├── components/           # UI components
│   ├── lib/                  # Client/API utilities
│   ├── package.json
│   └── Dockerfile
│
├── ml/                       # ML artifacts / model resources
│
├── rag/
│   ├── data/                 # Historical incident data
│   ├── embeddings/           # Precomputed embeddings
│   └── retrieval/            # Retrieval resources
│
├── infra/                    # Infrastructure configuration
├── docs/                     # Project documentation
├── Dockerfile                # Backend container image
├── docker-compose.yml        # Local multi-service orchestration
└── sample_data.csv           # Sample operational input
```

---

# 🐳 Containerized Deployment

The project includes Docker configuration for the backend and Docker Compose orchestration.

```text
PostgreSQL
    │
    ▼
FastAPI Backend :8000
    │
    ▼
Next.js Frontend :3000
```

The backend image installs the runtime dependencies, CPU PyTorch support, backend packages, ML artifacts, and RAG resources before starting FastAPI with Uvicorn.

The Compose setup also uses a PostgreSQL health check so the backend can wait for the database service before startup.

---

# ☁️ Deployment Architecture

```text
                         Internet
                            │
                            ▼
                 ┌────────────────────┐
                 │   Vercel / Next.js │
                 │      Frontend      │
                 └─────────┬──────────┘
                           │
                      HTTPS / WSS
                           │
                           ▼
                 ┌────────────────────┐
                 │ Cloudflare Tunnel  │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │      AWS EC2       │
                 │                    │
                 │ Docker             │
                 │ FastAPI :8000      │
                 │ PostgreSQL         │
                 │ ML + RAG           │
                 └────────────────────┘
```

The deployed backend was validated through health checks, live metrics, and the WebSocket upgrade path.

---

# 🔌 API Surface

Representative endpoints:

```text
GET   /
GET   /health
GET   /dashboard
GET   /analytics/summary
POST  /upload
POST  /predict
POST  /explain
POST  /rag/query
POST  /copilot
GET   /live-metrics
GET   /live-alerts
GET   /event-timeline
GET   /historical-risk
WS    /ws/live
```

The exact request/response contracts are defined in `backend/app/api/`.

---

# ⚙️ Local Development

## Prerequisites

- Python 3.13+
- Node.js / npm
- Docker
- Git
- Gemini API key for RAG functionality

## 1. Clone

```bash
git clone https://github.com/talarijayakiran/AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions.git
cd AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions
```

## 2. Configure environment variables

Create local environment configuration:

```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Never commit real API keys, database credentials, or private infrastructure credentials.**

## 3. Start with Docker Compose

```bash
docker compose up --build
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8000
```

Health check:

```bash
curl http://localhost:8000/health
```

---

# 🧪 Verification

The deployment was validated through functional checks rather than relying only on a successful container build.

### Backend health

```json
{
  "status": "healthy",
  "service": "ai-supply-chain-platform",
  "version": "1.0.0"
}
```

### Live metrics

The `/live-metrics` endpoint returns operational records containing port, risk, delay, congestion, and timestamp fields.

### WebSocket

The `/ws/live` endpoint was tested through the public Cloudflare endpoint and successfully returned:

```text
101 Switching Protocols
```

followed by streaming operational data.

This demonstrates that the deployed real-time communication path was exercised end-to-end.

---

# 🎯 Engineering Decisions

### Why FastAPI?

FastAPI provides a lightweight Python service layer for ML inference, RAG workflows, analytics, health checks, and WebSocket functionality.

### Why separate ML and RAG?

They solve different problems:

- **ML:** estimates disruption risk.
- **RAG:** retrieves historical evidence and generates contextual operational intelligence.

### Why precompute incident embeddings?

The historical corpus does not need to be embedded for every query. Precomputed embeddings reduce repeated computation during retrieval.

### Why WebSockets?

Continuously changing operational data does not need to rely exclusively on polling. WebSockets provide a persistent communication channel for live dashboard updates.

### Why Docker?

The system contains multiple runtime concerns—FastAPI, ML dependencies, RAG artifacts, and PostgreSQL. Containerization improves reproducibility and deployment consistency.

### Why environment-based configuration?

Deployment-specific values such as database URLs, API credentials, and frontend backend URLs should be supplied through environment configuration instead of hard-coded application logic.

---

# 📈 What This Project Demonstrates

## AI / ML Engineering

- Model inference integrated into a web service
- Deep-learning sequence inference
- Feature preprocessing
- Operational risk scoring

## Generative AI Engineering

- RAG architecture
- Embedding generation
- Semantic retrieval
- Context assembly
- LLM-based operational explanation
- Evidence-oriented generation

## Backend Engineering

- FastAPI service design
- REST API design
- WebSocket streaming
- PostgreSQL integration
- Health and operational endpoints

## MLOps / Cloud Engineering

- Dockerized application
- Docker Compose orchestration
- AWS EC2 deployment
- Cloudflare public routing
- Vercel frontend deployment
- Environment-driven configuration

## Production Thinking

- Separation of prediction and explanation
- Runtime health verification
- Persistent database service
- Real-time communication path
- Deployment validation
- Explicit system limitations

---

# ⚠️ Scope & Limitations

This is a **portfolio-scale, production-oriented system**. It is not a claim of operating a global supply-chain platform at enterprise traffic volume.

Important limitations:

- The live operational feed is application/demo data rather than a guaranteed external real-time shipping feed.
- The current prediction endpoint demonstrates model-serving integration using a predefined inference sequence.
- RAG quality depends on the incident corpus and embedding quality.
- The current deployment is designed for demonstration and portfolio evaluation, not millions of concurrent users.
- The current Cloudflare Quick Tunnel can change its public hostname if the tunnel process is restarted.

These limitations are documented deliberately rather than hidden behind unsupported scalability claims.

---

# 🔭 Future Engineering Improvements

If taking the system beyond portfolio scale:

- Replace the Quick Tunnel with persistent named ingress.
- Add authentication and role-based authorization.
- Add structured application logging and centralized log aggregation.
- Add metrics and alerting with Prometheus/Grafana or an equivalent stack.
- Add automated CI/CD with GitHub Actions.
- Add model/data drift monitoring and automated retraining.
- Introduce a dedicated vector database when corpus size justifies it.
- Add automated prediction evaluation and RAG faithfulness/relevance evaluation.
- Add load testing and capacity planning.
- Add stronger CORS, secrets management, rate limiting, and production security controls.

---

# 📌 Engineering Story

The central engineering path is:

```text
Operational Data
       ↓
ML Prediction
       ↓
Risk Signal
       ↓
Historical Retrieval
       ↓
Generative Explanation
       ↓
FastAPI Services
       ↓
Real-Time Monitoring
       ↓
Web Application
       ↓
Docker / Cloud Deployment
```

The project demonstrates how predictive ML and Generative AI can be integrated into a working application and deployed as a complete system.

---

# 👤 Author

**Talari Jayakiran**

AI / ML / MLOps / Generative AI Engineer

- GitHub: https://github.com/talarijayakiran
- Project: https://github.com/talarijayakiran/AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions
- Live Application: https://global-supply-chain-ai.vercel.app

---

##  For Reviewers

Start with the **60-second demo**, then inspect the **architecture**, **RAG pipeline**, **FastAPI routers**, **Docker configuration**, and **deployment structure**.

The repository is intended to demonstrate how ML/DL and GenAI components are integrated into a working application rather than demonstrated independently.
